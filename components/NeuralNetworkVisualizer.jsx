import React, { useState, useEffect, useRef } from 'react';

const NeuralNetworkVisualizer = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);       // Array of node objects
  const connectionsRef = useRef([]); // Array of connection objects
  const frameRef = useRef(0);

  // networkConfig is an array where:
  // index 0 = number of input nodes
  // index 1...n-2 = number of nodes in hidden layers
  // index n-1 = number of output nodes
  const [networkConfig, setNetworkConfig] = useState([3, 5, 2]);

  // Functions to update network architecture:
  const addInputNode = () => {
    setNetworkConfig(prev => {
      const newConfig = [...prev];
      newConfig[0] = newConfig[0] + 1;
      return newConfig;
    });
  };

  const addOutputNode = () => {
    setNetworkConfig(prev => {
      const newConfig = [...prev];
      newConfig[newConfig.length - 1] = newConfig[newConfig.length - 1] + 1;
      return newConfig;
    });
  };

  const addHiddenNode = () => {
    setNetworkConfig(prev => {
      // If there is no hidden layer (only input and output exist), insert one with a single node.
      if (prev.length < 3) {
        return [prev[0], 1, prev[1]];
      } else {
        const newConfig = [...prev];
        newConfig[1] = newConfig[1] + 1;
        return newConfig;
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;
    let mousePosition = { x: -100, y: -100 };

    // Activation & Propagation Parameters
    const inputActivationThreshold = 30; // pixels
    const propagationFactor = 0.85;
    const decayRate = 0.96; // Global decay per frame for activations
    const pulsateSpeed = 0.1; // Speed of pulsation
    const baseWeight = 0.5;   // Initial connection weight
    const weightIncrease = 0.005; // Increase when both nodes are active (Hebbian)
    const weightDecay = 0.9995;   // Slowly decay weights toward baseWeight
    const propagationDelay = 10; // Frames delay for signal propagation

    // Use the network configuration from state.
    const layers = networkConfig;

    // --- Initialize Nodes ---
    const initializeNodes = () => {
      nodesRef.current = [];
      const layerCount = layers.length;
      layers.forEach((numNodes, layerIndex) => {
        // Evenly space x-coordinates (with a margin)
        const x = ((canvas.width - 40) / (layerCount - 1)) * layerIndex + 20;
        for (let i = 0; i < numNodes; i++) {
          // Evenly distribute nodes vertically (with a margin)
          const y =
            numNodes === 1
              ? canvas.height / 2
              : ((canvas.height - 40) / (numNodes - 1)) * i + 20;
          nodesRef.current.push({
            x,
            y,
            baseRadius: 8,
            radius: 8,      // This radius will pulsate
            activation: 0,  // 0 (off) to 1 (fully activated)
            layer: layerIndex,
            pulse: 0,       // For pulsating effect
          });
        }
      });
    };

    // --- Initialize Connections ---
    // Each connection connects nodes from one layer to the next.
    const initializeConnections = () => {
      connectionsRef.current = [];
      const layersNodes = [];
      let startIndex = 0;
      layers.forEach((numNodes, layerIndex) => {
        layersNodes[layerIndex] = [];
        for (let i = 0; i < numNodes; i++) {
          layersNodes[layerIndex].push(startIndex++);
        }
      });
      // Connect every node in one layer to every node in the next layer.
      for (let l = 0; l < layersNodes.length - 1; l++) {
        layersNodes[l].forEach(fromIndex => {
          layersNodes[l + 1].forEach(toIndex => {
            connectionsRef.current.push({
              from: fromIndex,
              to: toIndex,
              weight: baseWeight,
              signalQueue: new Array(propagationDelay).fill(0),
              activity: 0, // For drawing the combined effect of queued signals
            });
          });
        });
      }
    };

    // --- Event Handlers ---
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // On click, send an activation burst to nearby nodes.
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      nodesRef.current.forEach(node => {
        const dx = clickPos.x - node.x;
        const dy = clickPos.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
          node.activation = 1;
        }
      });
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Process Signal Propagation along connections.
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        conn.signalQueue.push(fromNode.activation * conn.weight);
        conn.activity = conn.signalQueue.shift();
      });

      // Hebbian Learning: strengthen connections if both nodes are highly active.
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        if (fromNode.activation > 0.5 && toNode.activation > 0.5) {
          conn.weight = Math.min(1.0, conn.weight + weightIncrease);
        }
        // Slowly decay weight toward baseWeight.
        conn.weight = baseWeight + (conn.weight - baseWeight) * weightDecay;
      });

      // Propagate activation to non-input nodes based on incoming connections.
      nodesRef.current.forEach((node, index) => {
        if (node.layer !== 0) {
          const incoming = connectionsRef.current.filter(conn => conn.to === index);
          let maxIncoming = 0;
          incoming.forEach(conn => {
            if (conn.activity > maxIncoming) {
              maxIncoming = conn.activity;
            }
          });
          node.activation = Math.max(node.activation, maxIncoming * propagationFactor);
        }
      });

      // Mouse hover on input nodes triggers activation.
      nodesRef.current.forEach((node) => {
        if (node.layer === 0) {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < inputActivationThreshold) {
            node.activation = 1;
          }
        }
      });

      // Decay activations and update pulsation for visual effect.
      nodesRef.current.forEach(node => {
        node.activation *= decayRate;
        node.pulse += pulsateSpeed * (1 + node.activation);
        const pulseFactor = 0.3 * Math.abs(Math.sin(node.pulse)) * node.activation;
        node.radius = node.baseRadius * (1 + pulseFactor);
      });

      connectionsRef.current.forEach(conn => {
        conn.activity *= decayRate;
      });

      // --- Draw Connections ---
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        const opacity = Math.min(1, 0.2 + conn.activity * 1.5) * conn.weight;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1 + conn.activity * 2 + conn.weight * 2;
        ctx.stroke();
      });

      // --- Draw Nodes ---
      nodesRef.current.forEach((node) => {
        // Draw a soft glow for activated nodes.
        if (node.activation > 0.05) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${node.activation * 0.15})`;
          ctx.fill();
        }
        // Draw the node.
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + node.activation * 0.5})`;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    // --- Resize Handling ---
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      initializeNodes();
      initializeConnections();
    };

    // Initialize canvas and add event listeners.
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    animate();

    // Cleanup on unmount or when networkConfig changes.
    return () => {
      isActive = false;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [networkConfig]);

  return (
    <div className="relative w-full mt-8">
      {/* Architecture Controls */}
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={addInputNode}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Add Input Node
        </button>
        <button
          onClick={addHiddenNode}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Add Hidden Node
        </button>
        <button
          onClick={addOutputNode}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Add Output Node
        </button>
      </div>

      {/* Canvas Container */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden group">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/70"
        />
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm text-white/70 mb-1">
            Hover over the left-side (input) nodes to fire the network
          </p>
          <p className="text-xs text-white/60">
            Click anywhere for an activation burst!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkVisualizer;

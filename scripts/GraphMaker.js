let transitionobj = null;
function makeNetwork(contaionerId, myTable) {
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();

  for (var i = 1; i < myTable.length; i++) {
    var state = myTable[i][0];
    var isFinalState = myTable[i][4] === "Yes";

    nodes.add({
      id: state,
      label: state,
      shape: isFinalState ? "box" : "ellipse",
    });
  }

  for (var i = 1; i < myTable.length; i++) {
    var fromState = myTable[i][0];
    var aTransition = myTable[i][1];
    var bTransition = myTable[i][2];
    var epsilonTransition = myTable[i][3];

    if (epsilonTransition) {
      edges.add({ from: fromState, to: epsilonTransition, label: "ε" });
    }

    if (aTransition) {
      edges.add({ from: fromState, to: aTransition, label: "a" });
    }

    if (bTransition) {
      edges.add({ from: fromState, to: bTransition, label: "b" });
    }
  }

  var container = document.getElementById(contaionerId);
  var data = { nodes: nodes, edges: edges };
  var options = {};

  var network = new vis.Network(container, data, options);
}

function makeNetworkFromNfa(containerId, nfaObject) {
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();

  // Add states as nodes
  nfaObject.states.forEach((state) => {
    nodes.add({
      id: state,
      label: state,
      color: nfaObject.finalStates.includes(state)
        ? { background: "orange", border: "black" }
        : undefined,
      shape: nfaObject.finalStates.includes(state) ? "box" : "ellipse",
    });
  });

  // Add transitions as edges
  const uniqueEdges = new Set();
  nfaObject.transitions.forEach((toStates, key) => {
    const [fromState, symbol] = key.split("-");
    toStates.forEach((toState) => {
      const edgeKey = `${fromState}-${toState}`;
      if (!uniqueEdges.has(edgeKey)) {
        // console.log("edgeKey", edgeKey);
        edges.add({
          id: `${fromState}-${toState}`,
          from: fromState,
          to: toState,
          label: symbol,
        });

        uniqueEdges.add(edgeKey);
      } else {
        // Get all edges from fromState to toState
        const matchingEdges = edges.get({
          filter: (edge) => edge.from === fromState && edge.to === toState,
        });

        // Update labels of matching edges
        edges.update({
          id: matchingEdges[0].id,
          label: `${matchingEdges[0].label},${symbol}`,
        });
        // matchingEdges.forEach((edge) => {
        // });
      }
    });
  });
  // console.log("data", nfaObject.transitions);

  var container = document.getElementById(containerId);
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      selectionWidth: 3,
      smooth: {
        type: "curvedCCW",
        roundness: 0.2,
      },
      font: {
        align: "top",
        vadjust: -10,
      },
      arrows: {
        to: { enabled: true, scaleFactor: 0.5 }, // Enable arrows at the 'to' end of edges
        middle: false, // Disable arrows in the middle of edges
        from: false, // Disable arrows at the 'from' end of edges
      },
      // ... other edge options
    },
    physics: {
      // enabled: false,
      barnesHut: {
        gravitationalConstant: -8000,
        springLength: 150,
      },
    },
  };

  var network = new vis.Network(container, data, options);
  graphNetwork = network;
}

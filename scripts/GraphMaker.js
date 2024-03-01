function makeNetwork(contaionerId, myTable) {
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();

  for (var i = 1; i < transitionTable.length; i++) {
    var state = transitionTable[i][0];
    var isFinalState = transitionTable[i][4] === "Yes";

    nodes.add({
      id: state,
      label: state,
      shape: isFinalState ? "box" : "ellipse",
    });
  }

  for (var i = 1; i < transitionTable.length; i++) {
    var fromState = transitionTable[i][0];
    var aTransition = transitionTable[i][1];
    var bTransition = transitionTable[i][2];
    var epsilonTransition = transitionTable[i][3];

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

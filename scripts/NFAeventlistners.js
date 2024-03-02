let mainNfa = null;
let alltransitions = [];
let graphNetwork = null;
let inputstring = "010011";
document.getElementById("nfaButton").addEventListener("click", function () {
  const nfaRegex = document.getElementById("nfaregex").value;
  const tempNfa = regexToNFA(nfaRegex);
  const tempTransitionTable = generateTransitionTable(tempNfa);
  console.table(tempTransitionTable);
  //   document.getElementById("nfaOutput").innerHTML = "hello";
  createTable(tempTransitionTable, "nfaOutput");
});

document
  .getElementById("nfaInitializationButton")
  .addEventListener("click", function () {
    // nfaStates,nfaInitialState,nfaFinalStates,nfaTransitionFunction,nfaAlphabet
    const nfaStates = document.getElementById("nfaStates").value.split(",");
    const nfaInitialState = document.getElementById("nfaInitialState").value;
    const nfaFinalStates = document
      .getElementById("nfaFinalStates")
      .value.split(",");
    const nfaAlphabet = document.getElementById("nfaAlphabet").value.split(",");
    const nfaTransitionFunction = document
      .getElementById("nfaTransitionFunction")
      .value.trim()
      .split(",");
    // console.log(
    //   nfaStates,
    //   nfaInitialState,
    //   nfaFinalStates,
    //   nfaTransitionFunction,
    //   nfaAlphabet
    // );
    const tempNfa = new NFA();
    tempNfa.startState = nfaInitialState;
    tempNfa.finalStates = nfaFinalStates;
    tempNfa.states = nfaStates;
    tempNfa.alphabet = nfaAlphabet;
    for (let i = 0; i < nfaTransitionFunction.length; i++) {
      const tempTransition = nfaTransitionFunction[i].split(/[->]/); //inputString.split(/[->]/)
      tempNfa.addTransition(tempTransition[0], tempTransition[1], [
        tempTransition[2],
      ]);
    }
    mainNfa = tempNfa;
    // console.log(tempNfa);
    createTable(tempNfa, "nfaOutput");
    makeNetworkFromNfa("myNfaNetwork", tempNfa);
    // tempNfa.addStates(...nfaStates);
    // tempNfa.setStartState(nfaInitialState);
    // tempNfa.addFinalStates(nfaFinalStates);
    // tempNfa.addAlphabet(...nfaAlphabet);
    // for (let i = 0; i < nfaTransitionFunction.length; i++) {
    //   const temp = nfaTransitionFunction[i].split(",");
    //   tempNfa.addTransition(temp[0], temp[1], [temp[2]]);
    // }
    // console.log(tempNfa);
  });

document
  .getElementById("nfaSimulationButton")
  .addEventListener("click", function () {
    // startSimulation(mainNfa, string)
    if (!mainNfa) {
      alert("Please initialize the NFA first");
      return;
    }
    inputstring = document
      .getElementById("nfaInputString")
      .value.trim()
      .replace(/\s/g, "");
    startSimulation(mainNfa, inputstring);
  });
function highlightAndChangeColor(
  nodeId,
  highlightDuration,
  newColor,
  delayBeforeChange
) {
  // Highlight the node by changing its color
  graphNetwork.body.data.nodes.update([
    { id: nodeId, color: { background: "yellow" } },
  ]);

  // Reset the color after the highlight duration
  setTimeout(function () {
    // Change the color to the specified new color
    graphNetwork.body.data.nodes.update([
      { id: nodeId, color: { background: newColor } },
    ]);
  }, highlightDuration);
}

function showsimulation(stransactions, sgraph) {
  console.log("steps", stransactions.length);
  let i = 0;
  const stringShowDiv = document.getElementById("stringShow");
  stringShowDiv.innerHTML = "";
  let interval = setInterval(function () {
    if (i >= stransactions.length) {
      clearInterval(interval);
      let currentState = stransactions[stransactions.length - 1][2];
      if (mainNfa.finalStates.includes(currentState)) {
        graphNetwork.body.data.nodes.update([
          { id: currentState, color: { background: "lime" } },
        ]);
        document.getElementById("nfaOutput").innerText = "Accepted";
        console.log("Accepted");
      } else {
        graphNetwork.body.data.nodes.update([
          { id: currentState, color: { background: "#EE4B2B" } },
        ]);
        document.getElementById("nfaOutput").innerText = "Rejected";
        console.log("Rejected");
      }
      return;
    }
    const span = document.createElement("span");
    span.innerText = inputstring[i];
    span.id = `char${i}`;
    span.classList.add("highlight");
    stringShowDiv.appendChild(span);
    const temp = stransactions[i];
    // highlightAndChangeColor(temp[0], 1000, "#97c2fc", 1000);
    sgraph.selectEdges([temp[0] + "-" + temp[2]]);
    // highlightAndChangeColor(temp[2], 1000, "#97c2fc", 1000);

    i++;
  }, 500);
}
document
  .getElementById("nfaReplayButton")
  .addEventListener("click", function () {
    if (alltransitions.length == 0) {
      alert("Please simulate first");
      return;
    }
    showsimulation(alltransitions, graphNetwork);
  });

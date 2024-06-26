let mainNfa = null;
let alltransitions = [];
let graphNetwork = null;
let inputstring = "010011";
let inputTransitionString = "";
//remove epsilon transitions
//make dfa
document.getElementById("noenfaButton").addEventListener("click", function () {
  if (!inputTransitionString.includes("e")) {
    alert("no epsilon transitions ");
    return;
  }
});

//put value
document.getElementById("nfaButton").addEventListener("click", function () {
  inputTransitionString = "";
  document.getElementById("nfaTransitionFunction").innerText = "";
  const nfaRegex = document.getElementById("nfaregex").value.toString();
  let states = 1;
  for (let i = 0; i < nfaRegex.length; ) {
    const element = nfaRegex[i];
    // console.log("i=", i, element);
    if (element === "(") {
      while (nfaRegex[i] !== ")" && nfaRegex[i + 1] !== "*") {
        i++;
      }
      // console.log(states, "- 0,1 >", states);
      inputTransitionString += `q${states}-0>q${states},`;
      inputTransitionString += `q${states}-1>q${states},`;
      inputTransitionString += `q${states}-e>q${states + 1},`;
      states++;
      i += 2;
    } else if (element === "0" && nfaRegex[i + 1] === "*") {
      // console.log(states, "- 0* >", states);
      // console.log(states, "- e >", states + 1);
      inputTransitionString += `q${states}-0>q${states},`;
      inputTransitionString += `q${states}-e>q${states + 1},`;

      i += 2;
      states++;
    } else if (element === "1" && nfaRegex[i + 1] === "*") {
      // console.log(states, "- 1* >", states);
      // console.log(states, "- e >", states + 1);
      inputTransitionString += `q${states}-1>q${states},`;
      inputTransitionString += `q${states}-e>q${states + 1},`;

      i += 2;
      states++;
    } else if (element === "0") {
      // console.log(states, "- 0 >", states + 1);
      inputTransitionString += `q${states}-0>q${states + 1},`;
      i++;
      states++;
    } else if (element === "1") {
      // console.log(states, "- 1 >", states + 1);
      inputTransitionString += `q${states}-1>q${states + 1},`;

      i++;
      states++;
    } else {
      console.log("Invalid input");
      i++;
    }
  }
  document.getElementById("nfaTransitionFunction").innerText =
    inputTransitionString.slice(0, -1);
  document.getElementById("nfaAlphabet").value = `0,1`;
  document.getElementById("nfaStates").value = `q1`;
  for (let i = 1; i < states; i++) {
    document.getElementById("nfaStates").value += `,q${i + 1}`;
  }
  document.getElementById("nfaInitialState").value = `q1`;
  document.getElementById("nfaFinalStates").value = `q${states}`;

  console.log(inputTransitionString);
});
// create graph
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
// start simulation
document
  .getElementById("nfaSimulationButton")
  .addEventListener("click", function () {
    // startSimulation(mainNfa, string)
    if (!mainNfa) {
      alert(" initialize the NFA first");
      return;
    }
    if (inputTransitionString.includes("e")) {
      alert("Epsilon transitions are not supported");
      return;
    }
    document.getElementById("nfaOutput").innerText = "";

    inputstring = document
      .getElementById("nfaInputString")
      .value.trim()
      .replace(/\s/g, "");
    startSimulation(mainNfa, inputstring);
  });
// replay simulation
document
  .getElementById("nfaReplayButton")
  .addEventListener("click", function () {
    if (inputTransitionString.includes("e")) {
      alert("Epsilon transitions are not supported");
      return;
    }
    if (alltransitions.length == 0) {
      alert("simulate first");
      return;
    }

    document.getElementById("nfaOutput").innerText = "";

    showsimulation(alltransitions, graphNetwork);
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
  // change color
  var updatedNodes = [];
  sgraph.body.data.nodes.forEach(function (node) {
    console.log(mainNfa.finalStates, node.id);
    if (!mainNfa) {
      prompt("initialize the NFA first");
      return;
    }
    var updatedNode = {
      id: node.id,
      // color: { background: "#97c2fc" },
      color: mainNfa.finalStates.includes(node.id)
        ? { background: "orange", border: "black" }
        : { background: "#97c2fc" },
    };
    updatedNodes.push(updatedNode);
  });
  sgraph.body.data.nodes.update(updatedNodes);

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
/*
 */

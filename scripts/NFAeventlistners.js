let mainNfa = null;
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
    // startSimulation(nfaobj, string)
    if (!mainNfa) {
      alert("Please initialize the NFA first");
      return;
    }
    startSimulation(mainNfa, "011");
  });

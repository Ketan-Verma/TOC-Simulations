//input : nfa obj ,string
//output : boolean accepted or rejected
//
// Define the starting state
// const startingState = "S";
//************NFA obj**************
// this.states = new Set();
// this.alphabet = new Set();
// this.startState = null;
// this.finalStates = new Set();
// this.transitions = new Map();

function startSimulation(nfaobj, string) {
  //   console.log("startSimulation", nfaobj, string);
  let i = 0;
  alltransitions = [];
  let currentState = nfaobj.startState;

  let interval = setInterval(function () {
    if (i >= string.length) {
      clearInterval(interval);

      console.log(alltransitions);
      showsimulation(alltransitions, graphNetwork);
      return;
    }

    let currentSymbol = string[i];
    let nextStates = nfaobj.transitions.get(`${currentState}-${currentSymbol}`);
    // console.log("inp", currentState, currentSymbol, nextStates[0]);
    alltransitions.push([currentState, currentSymbol, nextStates[0]]);
    if (nextStates) {
      currentState = nextStates[0];
    }
    i++;
  }, 0);
}

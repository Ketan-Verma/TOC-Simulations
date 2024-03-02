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
  let currentState = nfaobj.startState;
  let interval = setInterval(function () {
    if (i >= string.length) {
      clearInterval(interval);
      if (nfaobj.finalStates.includes(currentState)) {
        console.log("Accepted");
      } else {
        console.log("Rejected");
      }
      return;
    }
    let currentSymbol = string[i];
    console.log("inp", currentSymbol, currentState);
    let nextStates = nfaobj.transitions.get(`${currentState}-${currentSymbol}`);
    if (nextStates) {
      currentState = nextStates[0];
    }
    i++;
  }, 100);
}

// // Define the string to check
// const inputString = "abc";

// // Define the custom interval in milliseconds
// const interval = 1000;
// function startSimulation() {
/*/   let tickspeed = document.getElementById("tickspeed-input")
  // ? document.getElementById("tickspeed-input").value
  // : 1000;
  //   let interval;
  let i = 0;
  //   let inpstr = document.getElementById("mstring")
  //     ? document.getElementById("mstring").value.toString()
  //     : "0000011";
  let currentNode = 1;
  let nextNode = null;

  interval = setInterval(function () {
    if (i >= inpstr.length) {
      clearInterval(interval);
      highlightNode(currentNode, 5000, "cyan");
      for (let node of finalNode) {
        highlightNode(node, 5000, "green");
        if (node === currentNode) {
          console.log("Accepted");
          return;
        }
      }
      //   document.getElementById("alphabet").innerText = "rejected";
      console.log("Rejected");
      return;
    }

    // highlightNode(currentNode, tickspeed / 2, "yellow");
    // document.getElementById("alphabet").innerText = inpstr[i];
    const currentEdge = edges.get({
      filter: function (edge) {
        return edge.from === currentNode && edge.label === inpstr[i];
      },
    });

    // highlightEdge(currentEdge[0].id, tickspeed);
    if (currentEdge.length > 0) {
      nextNode = currentEdge[0].to;
    } else {
      nextNode = currentNode;
      // Handle case when there is no edge for the current character
      // You can choose to do something here, like displaying an error message
    }
    currentNode = nextNode;
    i++;
  }, tickspeed);
}

function stopSimulation() {
  clearInterval(interval);
}
// Function to check if the NFA accepts the string
function checkAcceptance() {
  let currentState = startingState;
  let currentIndex = 0;

  while (currentIndex < inputString.length) {
    const currentSymbol = inputString[currentIndex];
    const transitions = nfa.getTransitions(currentState);

    if (transitions[currentSymbol]) {
      currentState = transitions[currentSymbol];
      currentIndex++;
    } else {
      break;
    }
  }

  if (
    currentIndex === inputString.length &&
    nfa.isAcceptingState(currentState)
  ) {
    console.log("The NFA accepts the string");
  } else {
    console.log("The NFA does not accept the string");
  }
}

// Start the loop with the custom interval
setInterval(checkAcceptance, interval);
*/

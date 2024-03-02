/*
NDFA(Q, ∑, δ,q0,F)
Q: finite set of states  
∑: finite set of the input symbol  
q0: initial state   
F: final state  
δ: Transition function  
*/

class NFA {
  constructor() {
    this.states = new Set();
    this.alphabet = new Set();
    this.startState = null;
    this.finalStates = new Set();
    this.transitions = new Map();
  }

  addState(state) {
    this.states.add(state);
  }

  addAlphabet(symbol) {
    this.alphabet.add(symbol);
  }

  addTransition(fromState, symbol, toStates) {
    const key = `${fromState}-${symbol}`;
    this.transitions.set(key, toStates);
  }

  setStartState(state) {
    this.startState = state;
  }

  addFinalState(state) {
    this.finalStates.add(state);
  }
}
/*

function buildNFAFromPostfix(postfix) {
//   const stack = [];

//   for (let i = 0; i < postfix.length; i++) {
//     const symbol = postfix[i];

//     if (/[a-zA-Z0-9]/.test(symbol)) {
//       // Operand: Create a basic NFA
//       const nfa = new NFA();
//       const startState = Symbol("start");
//       const finalState = Symbol("final");

//       nfa.addState(startState);
//       nfa.addState(finalState);
//       nfa.addAlphabet(symbol);
//       nfa.addTransition(startState, symbol, [finalState]);
//       nfa.setStartState(startState);
//       nfa.addFinalState(finalState);

//       stack.push(nfa);
//     } else {
//       // Operator: Apply operation to NFAs on the stack
//       if (symbol === "|") {
//         const nfa2 = stack.pop();
//         const nfa1 = stack.pop();
//         const nfa = new NFA();

//         const startState = Symbol("start");
//         const finalState = Symbol("final");

//         nfa.addState(startState);
//         nfa.addState(finalState);
//         nfa.setStartState(startState);
//         nfa.addFinalState(finalState);

//         nfa.addAlphabet(...nfa1.alphabet, ...nfa2.alphabet);

//         nfa.addTransition(startState, "ε", [nfa1.startState, nfa2.startState]);
//         nfa.addTransition(nfa1.finalStates.values().next().value, "ε", [
//           finalState,
//         ]);
//         nfa.addTransition(nfa2.finalStates.values().next().value, "ε", [
//           finalState,
//         ]);

//         stack.push(nfa);
//       } else if (symbol === ".") {
//         const nfa2 = stack.pop();
//         const nfa1 = stack.pop();
//         const nfa = new NFA();

//         nfa.addAlphabet(...nfa1.alphabet, ...nfa2.alphabet);
//         nfa.addStates(nfa1.states);
//         nfa.addStates(nfa2.states);
//         nfa.setStartState(nfa1.startState);

//         nfa.addTransition(nfa1.finalStates.values().next().value, "ε", [
//           nfa2.startState,
//         ]);

//         nfa.addFinalStates(nfa2.finalStates);

//         stack.push(nfa);
//       } else if (symbol === "*") {
//         const nfa1 = stack.pop();
//         const nfa = new NFA();

//         const startState = Symbol("start");
//         const finalState = Symbol("final");

//         nfa.addState(startState);
//         nfa.addState(finalState);
//         nfa.setStartState(startState);
//         nfa.addFinalState(finalState);
//         nfa.addAlphabet(...nfa1.alphabet);

//         nfa.addTransition(startState, "ε", [nfa1.startState, finalState]);
//         nfa.addTransition(nfa1.finalStates.values().next().value, "ε", [
//           nfa1.startState,
//           finalState,
//         ]);

//         stack.push(nfa);
//       }
//     }
//   }

//   // The final NFA will be on the top of the stack
//   return stack.pop();
// }

// Example usage:
// const postfixExpression = "ab.|c*.";
// const tempNfanfa = buildNFAFromPostfix(postfixExpression);
// console.log(tempNfanfa);
function regexToNFA(regex) {
  const nfa = new NFA();

  const state0 = "q0";
  const state1 = "q1";

  nfa.addState(state0);
  nfa.addState(state1);
  nfa.addAlphabet("a");
  nfa.addAlphabet("b");

  nfa.addTransition(state0, "ε", [state1]);
  nfa.addTransition(state0, "ε", [state0]);
  nfa.addTransition(state1, "a", [state1]);
  nfa.addTransition(state1, "b", [state1]);

  nfa.setStartState(state0);
  nfa.addFinalState(state1);

  return nfa;
}

function generateTransitionTable(nfa) {
  const table = [];
  const headerRow = ["State", ...Array.from(nfa.alphabet), "ε", "Final State"];
  table.push(headerRow);

  for (const state of nfa.states) {
    const row = [state];

    for (const symbol of Array.from(nfa.alphabet)) {
      const key = `${state}-${symbol}`;
      const transitions = nfa.transitions.get(key) || [];
      row.push(transitions.join(", "));
    }

    const epsilonKey = `${state}-ε`;
    const epsilonTransitions = nfa.transitions.get(epsilonKey) || [];
    row.push(epsilonTransitions.join(", "));

    row.push(nfa.finalStates && nfa.finalStates.has(state) ? "Yes" : "No");

    table.push(row);
  }

  return table;
}

// const nfa = regexToNFA("(a|b)*");
// const transitionTable = generateTransitionTable(nfa);
// console.log("nfa");
// console.log(nfa);
// console.table(transitionTable);
*/

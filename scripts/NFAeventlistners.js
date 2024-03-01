document.getElementById("nfaButton").addEventListener("click", function () {
  const nfaRegex = document.getElementById("nfaregex").value;
  const tempNfa = regexToNFA(nfaRegex);
  const tempTransitionTable = generateTransitionTable(tempNfa);
  console.table(tempTransitionTable);
  //   document.getElementById("nfaOutput").innerHTML = "hello";
  createTable(tempTransitionTable, "nfaOutput");
});

self.addEventListener('message', function(e) {

  const { data } = e;
  const { command } = data;

  switch (command) {
    case 'launch':
      self.postMessage('Worker started');
      break;
    case 'stop':
      self.postMessage('Worker stopped');
      self.close();
      break;
    case 'count':
      var { input } = data;
      if (input > 1) {
        var factorial = 1;
        while (input > 1) {
          for (let i = 0; i < 100000; i++) {
            for (let k = 0; k < 10000; k++) {

            }
          }
          factorial *= input;
          self.postMessage(`Factorial equals ${factorial}`);
          input--;
        }
      } else if (input == 1) {
        self.postMessage('Factorial equals 1');
      } else {
        self.postMessage('Enter a non-negative number');
      }
      break;
    default:
      self.postMessage(`Unknown command ${command}`);
  }
}, false);
fetch('game.js')
  .then(function(response) { return response.text(); })
  .then(function(source) {
    source = source.replace("this.textContent=`Recorded`;this.disabled=true", "this.textContent='Recorded';this.disabled=true");
    var blob = new Blob([source], {type: 'text/javascript'});
    var script = document.createElement('script');
    script.src = URL.createObjectURL(blob);
    document.body.appendChild(script);
  })
  .catch(function(error) {
    console.error(error);
    document.getElementById('app').textContent = 'The game could not start. Please refresh the page.';
  });

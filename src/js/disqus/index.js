
const initDisqus = (configuration) => {  
  var disqus_config = function() {
    this.page.url = configuration.url;
    this.page.identifier = 'test-' + configuration.identifier;
    this.page.title = configuration.title;
  }

    var d = document, s = d.createElement('script');
    
    s.src = 'https://lewismsparlin.disqus.com/embed.js'; 
    
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}

export default {
  initDisqus
}

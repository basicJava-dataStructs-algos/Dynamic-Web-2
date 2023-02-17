import render from "./teacherRender.js";

const VueRoot=require("./"+TEST_PREFIX+"VueRoot.js").default;

const preamble= <div>
                  This is the Observer interactive test. The model of the application below has two observers attached,
                  <ul>
                    <li><b>logObs</b> will log in console.log (in black) every time it is notified</li>
                    <li><b>errorObs</b> will log in console.error (in red) every time it is notified</li>
                  </ul>
                  <p>
                    The mmodel is made available as the global variable <b>myModel</b>. Try the following:
                  </p>
                  <ul>
                    <li><pre>myModel.notifyObservers()</pre></li>
                    <li><pre>myModel.notifyObservers("example payload")</pre></li>
                    <li>interact with the app to change the model. Then notify:</li>
                    <li><pre>myModel.notifyObservers()</pre></li>
                    <li><pre>myModel.removeObserver(errorObs)</pre></li>                   
                    <li><pre>myModel.notifyObservers()</pre></li>
                    <li><pre>myModel.addObserver(errorObs)</pre></li>
                    <li>call notifyObservers from setNumberOfGuests, addToMenu, removeFromMenu, setCurrentDish!</li>
                    <li>interact with the app to change the model and see both observers in action</li>
                    <li><pre>myModel.setNumberOfGuests(5)</pre></li>
                  </ul>
                  <hr/>
                </div>;
render(<div>{preamble}
       <VueRoot/>
       </div>,
    document.getElementById('root')
);

window.myModel= require("./"+TEST_PREFIX+"VueRoot.js").proxyModel;

window.errorObs= function(payload){
    console.error("errorObs was notified"+( payload?", payload is: "+payload:"")
                  +". It is only interested in dishes, ids are: "+window.myModel.dishes.map(function idCB(d){return d.id;})
                  +(window.myModel.dishes.length?"":"(none)"));
}

window.logObs= function(payload){
    console.log("logObs was notified"+ (payload?", payload is: "+payload:"")
                                 +". guests:"+window.myModel.numberOfGuests+", "+window.myModel.dishes.length+" dishes, currentDish: "+window.myModel.currentDish);
}

window.myModel.addObserver(window.logObs);
window.myModel.addObserver(window.errorObs);

var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.f23fcb49-2cb8-4f7e-a8ba-cd7e2fe67a36';
    alexa.registerHandlers(whereIsHandlers, whereIsJaneHandlers);
    alexa.execute();

};
var states = {
    Jane: "_Jane",
    Midget:"_Midget"
}
//need to add handlers for unhandled

var whereIsHandlers = {

    'WHEREIS': function () {
        var intentObj = this.event.request.intent;
        var whereIsPerson = intentObj.slots[0];
        switch (whereIsPerson) {
            case "Jane":
                this.handler.state = states.Jane;
                var whoIsJaneWithQuestion = 'Who is she with ?';
                this.emit(':ask', whoIsJaneWithQuestion, whoIsJaneWithQuestion);
                break;

            //may refactor Alice, Johhny and Dan
            case "Alice":
                
                var aliceSsml = "";
                break;
            case "Johnny":
                var johnnySsml = "";
                this.response.audioPlayerPlay("REPLACE_ALL", "https://1drv.ms/u/s!AtB1aD1W_wjBgo0NwxSon6adHub8HQ", "1", null, 0);
                this.emit(':responseReady');
                break;
            case "Dan":
                //this.emit not sufficient when doing full mp3
                break;
            case "Midget":
                this.handler.state = states.Midget;
                //may need to go to ssml
                var midgetActivitiesQuestion = 'Which of the following does midget like doing ? Acting. Misbehaving. Eating. Telling jokes ?';
                this.emit(':ask', midgetActivitiesQuestion, midgetActivitiesQuestion);
                break;
            //default - wtf 
        }
        
    }
    

};
var whereIsJaneHandlers = Alexa.CreateStateHandler(states.Jane, {
    'JANEWITH': function () {
        var intentObj = this.event.request.intent;
        var janeWithPerson = intentObj.slots[0];
        switch (janeWithPerson) {
            case "Me":
                this.emit(':tell', "Why are you asking me then nobby.<break time='2s'/> Wanker !");
                break;
            case "Nel":
                //possible ssml for address
                var cardTitle = 'Jane with Mum';
                var cardContent = '';
                var imageObj = '';
                this.emit(':tellWithCard', 'She will be at 3 Hatfield Road', cardTitle, cardContent, imageObj);
            case "Clair":
                var cardTitle = 'Jane with Clair';
                var cardContent = '';
                var imageObj = '';
                //assume that state gets cleared automatically with tell
                this.emit(':tellWithCard', 'She will be at 5 Hatfield Road', cardTitle, cardContent, imageObj);
            //default
        }
    }
});

var midgetHandlers = Alexa.CreateStateHandler(states.MIDGET,  {
    'MIDGETACTIVITY': function () {
        var intentObj = this.event.request.intent;
        var midgetActivity = intentObj.slots[0];
        //instead of switching could just emit
        var cardTitle = 'Love midget !';
        var cardContent, imageObj;
        var midgetSpeech;
        var imageObj;
        switch (midgetActivity) {
            case 'Acting':
                midgetSpeech = 'Midget cannot be found anywhere but you have been sent a cute postcard';
                cardContent = "Hello !";
                imageObj = {
                    smallImageUrl: 'https://i.imgur.com/PIGjG0V.jpg'
                }
                break;
            case 'Misbehaving':
                midgetSpeech = 'Midget is in vegas, you have been sent a postcard !';

                break;
            case 'Telling jokes':
                //this will change to the other joke - I wish I was friends with a midget so I could introduce them by saying, "Say hello to my little friend"
                midgetSpeech = "Midget cannot be found, but here is a joke that he likes ! <break time='2s'/> When do you kick a midget in the balls?  <break time='3s'/> When he is standing next to your miss saying her hair smells nice. <break time='3s'/> You have been sent a postcard with more jokes";
                break;
            case 'Eating':
                midgetSpeech = 'Midget has been found stuffing his face, you have been sent a postcard';
                break;
            //default test
        }
        //for now will do without cardTitle/cardContent and imageObj 
        //both cardTitle and cardContent 
        //{smallImageUrl:'' and or largeImageUrl}
        this.emit(':tellWithCard', midgetSpeech, cardTitle, cardContent, imageObj);

    }
}
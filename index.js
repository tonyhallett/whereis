var Alexa = require('alexa-sdk');

var states = {
    Jane: "_Jane",
    Midget: "_Midget"
};


var whereIsHandlers = {

    'WHEREIS': function () {
        var intentObj = this.event.request.intent;
        var whereIsPerson = intentObj.slots.WhereIsPeople.value;
        if (!whereIsPerson || whereIsPerson === "") {
            var didntGetThat = 'Sorry, but I am a little hard of hearing. Have another go';
            this.emit(':ask', didntGetThat, didntGetThat);
        } else {
            whereIsPerson = whereIsPerson.toLowerCase();
            switch (whereIsPerson) {
                case "jane":
                    this.handler.state = states.Jane;
                    var whoIsJaneWithQuestion = 'Who is she with ?';
                    this.emit(':ask', whoIsJaneWithQuestion, whoIsJaneWithQuestion);
                    break;

                //may refactor Alice, Johhny and Dan
                case "alice":

                    var aliceSsml = "";
                    break;
                case "johnny":
                    var johnnySsml = "";
                    this.response.audioPlayerPlay("REPLACE_ALL", "https://1drv.ms/u/s!AtB1aD1W_wjBgo0NwxSon6adHub8HQ", "1", null, 0);
                    this.emit(':responseReady');
                    break;
                case "dan":
                    //<break time="3s"/>
                    var danSpeech = 'Here is Dan.<audio src= "https://1drv.ms/u/s!AtB1aD1W_wjBg4xPvprpsKGBVpONqg" />';
                    //will replace the nulls with cheesy alan partridge
                    this.emit(':tellWithCard', danSpeech, null, null, null);
                    break;
                case "midget":
                    this.handler.state = states.Midget;
                    //may need to go to ssml
                    var midgetActivitiesQuestion = 'Which of the following does midget like doing ? Acting. Misbehaving. Eating. Telling jokes ?';
                    this.emit(':ask', midgetActivitiesQuestion, midgetActivitiesQuestion);
                    break;
                //default - wtf 
            }
        }


    },
    'Unhandled': function () {
        this.emit(':tell', 'Unhandled where is');
    }

};
var whereIsJaneHandlers = Alexa.CreateStateHandler(states.Jane, {
    'JANEWITH': function () {
        var intentObj = this.event.request.intent;
        var janeWithPerson = intentObj.slots.JaneWithPeople.value;
        if (!janeWithPerson || janeWithPerson === "") {
            this.emit(':tell', "Jane with person null or undefined");
        } else {
            var cardContent, cardTitle, imageObj;
            janeWithPerson = janeWithPerson.toLowerCase();
            switch (janeWithPerson) {
                case "nobby":
                    this.emit(':tell', "Why are you asking me then nobby.  Wanker !");
                    break;
                case "nel":
                    //possible ssml for address
                    cardTitle = 'Jane with Mum';
                    cardContent = 'Content';
                    this.emit(':tellWithCard', 'She will be at 3 Hatfield Road', cardTitle, cardContent, imageObj);
                    break;
                case "clair":
                    cardTitle = 'Jane with Clair';
                    cardContent = 'Content';
                    //assume that state gets cleared automatically with tell
                    this.emit(':tellWithCard', 'She will be at 5 Hatfield Road', cardTitle, cardContent, imageObj);
                    break;
                default:
                    this.emit(':tell', "She is with" + janeWithPerson);
            }
        }
    },
    'Unhandled': function () {
        this.emit(':tell', 'Unhandled where is jane');
    }
});

var midgetHandlers = Alexa.CreateStateHandler(states.Midget, {
    'MIDGETACTIVITY': function () {
        console.log("in midget activity");
        this.emit(':tell', "made it to midget intent");
        //var intentObj = this.event.request.intent;
        //var midgetActivity = intentObj.slots.MidgetActivities.value;

        //var cardTitle = 'Love midget !';
        //var cardContent, imageObj;
        //var midgetSpeech;
        //if (!midgetActivity || midgetActivity === "") {
        //    var didntGetThat = 'Sorry, but I am a little hard of hearing. Have another go';
        //    this.emit(':ask', didntGetThat, didntGetThat);
        //} else {
        //    //midgetActivity = midgetActivity.toLowerCase();
        //    //switch (midgetActivity) {
        //    //    case 'acting':
        //    //        midgetSpeech = 'Midget cannot be found anywhere but you have been sent a cute postcard';
        //    //        cardContent = "Hello !";
        //    //        imageObj = {
        //    //            smallImageUrl: 'https://i.imgur.com/PIGjG0V.jpg'
        //    //        };
        //    //        break;
        //    //    case 'misbehaving':
        //    //        midgetSpeech = 'Midget is in vegas, you have been sent a postcard !';

        //    //        break;
        //    //    case 'telling jokes':
        //    //        //this will change to the other joke - I wish I was friends with a midget so I could introduce them by saying, "Say hello to my little friend"
        //    //        midgetSpeech = "Midget cannot be found, but here is a joke that he likes ! <break time='2s'/> When do you kick a midget in the balls?  <break time='3s'/> When he is standing next to your miss saying her hair smells nice. <break time='3s'/> You have been sent a postcard with more jokes";
        //    //        break;
        //    //    case 'eating':
        //    //        midgetSpeech = 'Midget has been found stuffing his face, you have been sent a postcard';
        //    //        break;
        //    //    //default test
        //    //}
        //    ////for now will do without cardTitle/cardContent and imageObj 
        //    ////both cardTitle and cardContent 
        //    ////{smallImageUrl:'' and or largeImageUrl}
        //    //this.emit(':tellWithCard', midgetSpeech, cardTitle, cardContent, imageObj);
        //    this.emit(':tell', midgetActivity);
        //}


    },
    'Unhandled': function () {
        this.emit(':tell', 'Unhandled midget');
    }
});

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.f23fcb49-2cb8-4f7e-a8ba-cd7e2fe67a36';
    alexa.registerHandlers(whereIsHandlers, whereIsJaneHandlers, midgetHandlers);
    alexa.execute();

};


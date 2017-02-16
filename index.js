var _Promise = require('bluebird');
var midi = require('midi');
var _ = require('lodash');

var input = new midi.input();

var num = input.getPortCount();

var portName = 'Disaster MIDI   ';

var portNum = -1;
console.log('PORT COUNT', num);
for (var i = 0; i < num; i++) {
    console.log('"' + input.getPortName(i) + '"');
    if (input.getPortName(i) == portName) {
        console.log( i );
        portNum = i;
        break;
    }
}

var output = new midi.output();

if (portNum != -1) {
    console.log( portNum );
    // Open the first available input port.
    input.openPort(portNum);
    output.openVirtualPort("Tyler MIDI");

    // Configure a callback.
    input.on('message', function(deltaTime, message) {
        // The message is an array of numbers corresponding to the MIDI bytes:
        //   [status, data1, data2]
        // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
        // information interpreting the messages.
        if(message[0] == 192 && (message[1] === 0 || message[1] == 1)) {
            console.log('m:' + message + ' d:' + deltaTime);
            console.log('m:176,4,127');
            output.sendMessage([176,4,127]);
        }
        // input.closePort();
    });

}

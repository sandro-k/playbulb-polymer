# Playbulb Polymer

[Live Demo](sandro-k.github.io/playbulb-polymer/app/)

This is a demo app that demonstrates the usage of the 
[Platinum Bluetooth Elements](https://github.com/PolymerElements/platinum-bluetooth)
in conjunction with the [Playbulb Candle](http://www.playbulb.com/en/playbulb-candle-bluetooth-smart-led-flameless-candle.html).

In addition it is used to test out the WebBluetooth API on different platforms. The following bugs could be found:
  * [Chrome Bug #655931](https://bugs.chromium.org/p/chromium/issues/detail?id=655931)
 

# Playbulb Candle API

## Services & Characteristics

* Device Information 0x180A 
    * Serial Number String 0x2A25 READ - Blacklisted for WebBluetooth
    * Firmware Revision String 0x2A26 READ
    * Hardware Revision String 0x2A27 READ
    * Software Revision String 0x2A28 READ
    * Manufacturer Name String 0x2A29 READ
    * PnP ID 0x2A50 READ
* Battery Service 0x180F
    * Battery Level 0x2A19 READ NOTIFY
* Unknown Service 0xFF02 
    * Heart Rate Measurement 0x2A37 NOTIFY
    * Unknown Characteristic 0xFFF8 READ
    * Unknown Characteristic 0xFFF9 READ WRITE
    * Unknown Characteristic 0xFFFA READ WRITE_WITHOUT_RESPONSE
    * Unknown Characteristic 0xFFFB READ WRITE_WITHOUT_RESPONSE
    * Unknown Characteristic 0xFFFC READ WRITE_WITHOUT_RESPONSE
    * Unknown Characteristic 0xFFFD READ WRITE
    * Unknown Characteristic 0xFFFE READ WRITE
    * Unknown Characteristic 0xFFFF READ WRITE
    
# Usage

```
git clone https://github.com/sandro-k/playbulb-polymer.git
cd playbulb-polymer
bower install
```
  
# Contributions

This is an Open Source project and contributions, bug reports and feedback is always welcome. 
Don't hesitate to file a bug if anything is not 100% clear or should/can be done in a better way. 
This project has its structure because it worked in the past, but everything is open to discussion, 
so pleas feel free to change however needed.    
  
  
# [LICENSE](LICENSE)
  
The MIT License (MIT)

Copyright (c) 2016 Sandro Kock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.  
(function () {
  'use strict'

  // noinspection JSUnresolvedFunction
  let encoder = new TextEncoder('utf-8')
  // noinspection JSUnresolvedFunction
  let decoder = new TextDecoder('utf-8')

  Polymer({
    is: 'playbulb-element',

    properties: {
      battery: {
        type: Number,
        readOnly: true,
        notify: true,
        value: NaN
      },

      device: {
        type: Object,
        readOnly: true,
        notify: true,
        value: null
      },

      _device: {
        type: Object,
        observer: '_setDevice'
      },

      name: {
        type: String,
        readOnly: true,
        notify: true,
        value: 'loading..'
      },

      color: {
        type: String,
        readOnly: true,
        notify: true
      },

      colorObject: {
        type: Object,
        readOnly: true,
        notify: true
      },

      serviceFilter: {
        type: Object,
        value: function () {
          return [ 0xFF02 ]
        }
      },

      UUIDs: {
        type: Object,
        value: function () {
          return {
            'device_information': 0x180A,
            'serial_number': 0x2A25,
            'firmware_revision': 0x2A26,
            'hardware_revision': 0x2A27,
            'software_revision': 0x2A28,
            'manufacturer_name': 0x2A29,
            'pnp_id': 0x2A50,
            'battery_service': 0x180F,
            'battery_level': 0xFF02,
            'application_service': 0xFF02,
            'heart_rate_measurement': 0x2A37,
            '0xFFF8': 0xFFF8,
            '0xFFF9': 0xFFF9,
            '0xFFFA': 0xFFFA,
            '0xFFFB': 0xFFFB,
            '0xFFFC': 0xFFFC,
            '0xFFFD': 0xFFFD,
            '0xFFFE': 0xFFFE,
            '0xFFFF': 0xFFFF,
          }
        }
      },

      candelServiceUUID: {
        type: Number,
        value: 0xFFFC
      },

      candelEffectUUID: {
        type: Number,
        value: 0xFFFB
      },

      candelNameUUID: {
        type: Number,
        value: 0xFFFF
      },

      _effect: {
        type: Object
      },

      _nextColor: {
        type: Array,
        value: function () {
          return []
        }
      },

      _currentColorWrite: {
        type: Promise
      }

    },

    /**
     * Request to connect to a PLAYBULB LED flameless candle by triggering the WebBluetooth device picker.
     * PlaybulElement.connect needs to be called from an user interaction like a button click to open up the device chooser
     */
    connect: function () {
      return this.$.bluetoothDevice.request()
        .then(_ => this.$.colorCharacteristic.read())
        .then(_ => this._updateColor())
        .then(_ => this.$.effectCharacteristic.read())
        .then(_ => this.$.nameCharacteristic.read())
        .then(_ => this.$.batteryCharacteristic.startNotifications())
    },

    disconnect: function () {
      console.log('disconnect')
      this.$.bluetoothDevice.disconnect()
    },

    /**
     * Sets the color on the device
     * @param red {Number} from 0..255
     * @param green {Number} from 0..255
     * @param blue {Number} from 0..255
     */
    setColor: function (red, green, blue) {
      // set up the data array
      let data = new Uint8Array([ 0x00, red, green, blue ])
      // if the is already a write wait until it finishes
      if (this._currentColorWrite) {
        // save the next color
        this.push('_nextColor', data)
        // attache a fuction to the last write promise
        this._currentColorWrite.then(_ => {
          // write out the color in the queue
          this._currentColorWrite = this.$.colorCharacteristic.write(this.shift('_nextColor'))
        })
      } else {
        // write out the current color
        this._currentColorWrite = this.$.colorCharacteristic.write(data)
      }
    },

    /**
     *
     * @param red
     * @param green
     * @param blue
     * @returns {Promise.<TResult>}
     */
    resetEffect: function (red, green, blue) {
      let effect = new Uint8Array([ 0x00, red, green, blue, 0x00, 0x00, 0x00, 0x00 ])
      return this.$.effectCharacteristic.write(effect).then(() => {
        this.setColor(red, green, blue)
      })
    },

    setCandleEffectColor: function (red, green, blue) {
      let data = [ 0x00, red, green, blue, 0x04, 0x00, 0x01, 0x00 ]

      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ red, green, blue ])
    },

    setFlashingColor: function (red, green, blue) {
      let data = [ 0x00, red, green, blue, 0x00, 0x00, 0x1F, 0x00 ]
      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ red, green, blue ])
    },

    setPulseColor: function (red, green, blue) {
      // We have to correct user color to make it look nice for real...
      let newRed = Math.min(Math.round(red / 64) * 64, 255)
      let newGreen = Math.min(Math.round(green / 64) * 64, 255)
      let newBlue = Math.min(Math.round(blue / 64) * 64, 255)
      let data = [ 0x00, newRed, newGreen, newBlue, 0x01, 0x00, 0x09, 0x00 ]
      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ red, green, blue ])
    },

    setRainbow: function () {
      let data = [ 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x00 ]
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
    },

    setRainbowFade: function () {
      let data = [ 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x26, 0x00 ]
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
    },

    setName: function (name) {
      let data = encoder.encode(name)
      return this.$.nameCharacteristic.write(data)
    },

    _updateBattery: function (event, details) {
      this._setBattery(details.value.getUint8(0))
    },

    _updateEffect: function (event, details) {
      let data = []
      for (var i = 0; i < 8; i++) {
        data.push(details.value.getUint8(i))
      }
    },

    _updateName: function (event, details) {
      this._setName(decoder.decode(details.value))
    },

    _updateColor: function (event, details) {
      if (details && details.value) {
        var intToHex = function (i) {
          let hex = i.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        }
        var colorObject = {
          red: details.value.getUint8(1),
          green: details.value.getUint8(2),
          blue: details.value.getUint8(3)
        }

        let red = intToHex(colorObject.red)
        let green = intToHex(colorObject.green)
        let blue = intToHex(colorObject.blue)

        this._setColor('#' + red + green + blue)
        this._setColorObject(colorObject)
      }
    }
  })
})()

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Bluetooth Printer</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-button @click="connectBluetooth">Connect to Printer</ion-button>
        <ion-button @click="printReceipt">Print Receipt</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { alertController } from '@ionic/vue';
  import  Plugins  from '@capacitor/core';
  
  const { BluetoothSerial } = Plugins;
  
  const device = ref(null);
  
  const connectBluetooth = async () => {
    try {
      const devices = await BluetoothSerial.list();
      console.log(devices);
      if (devices.length > 0) {
        device.value = devices[0]; // Choisissez le premier appareil pour simplifier
        await BluetoothSerial.connect(device.value.id);
        alertController.create({
          header: 'Success',
          message: `Connected to ${device.value.name}`,
          buttons: ['OK'],
        }).then(alert => alert.present());
      }
    } catch (error) {
      console.error(error);
      alertController.create({
        header: 'Error',
        message: `Failed to connect: ${error.message}`,
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  };
  
  const printReceipt = async () => {
    if (!device.value) {
      alertController.create({
        header: 'Error',
        message: 'No device connected',
        buttons: ['OK'],
      }).then(alert => alert.present());
      return;
    }
  
    try {
      const receipt = `
        Receipt
        -------------------------
        Item 1          $10.00
        Item 2          $15.00
        -------------------------
        Total           $25.00
      `;
      await BluetoothSerial.write(receipt);
      alertController.create({
        header: 'Success',
        message: 'Receipt printed successfully',
        buttons: ['OK'],
      }).then(alert => alert.present());
    } catch (error) {
      console.error(error);
      alertController.create({
        header: 'Error',
        message: `Failed to print: ${error.message}`,
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  };
  </script>
  

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Bluetooth Printer</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-button @click="connectBluetooth">Connect to Printer</ion-button>
        <ion-button @click="printReceipt">Print Receipt</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { alertController } from '@ionic/vue';
  import { BluetoothLe } from '@capacitor-community/bluetooth-le';
  
  const device = ref(null);
  
  const connectBluetooth = async () => {
    try {
      await BluetoothLe.initialize();
      const devices = await BluetoothLe.requestDevice();
      console.log(devices);
      if (devices.device) {
        device.value = devices.device;
        await BluetoothLe.connect({ deviceId: device.value.deviceId });
        alertController.create({
          header: 'Success',
          message: `Connected to ${device.value.name}`,
          buttons: ['OK'],
        }).then(alert => alert.present());
      }
    } catch (error) {
      console.error(error);
      alertController.create({
        header: 'Error',
        message: `Failed to connect: ${error.message}`,
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  };
  
  const printReceipt = async () => {
    if (!device.value) {
      alertController.create({
        header: 'Error',
        message: 'No device connected',
        buttons: ['OK'],
      }).then(alert => alert.present());
      return;
    }
  
    try {
      const receipt = `
        Receipt
        -------------------------
        Item 1          $10.00
        Item 2          $15.00
        -------------------------
        Total           $25.00
      `;
      const data = new TextEncoder().encode(receipt);
      await BluetoothLe.write({
        deviceId: device.value.deviceId,
        service: 'service-uuid',  // Remplacer par le UUID du service de votre imprimante
        characteristic: 'characteristic-uuid',  // Remplacer par le UUID de la caractéristique de votre imprimante
        value: data
      });
      alertController.create({
        header: 'Success',
        message: 'Receipt printed successfully',
        buttons: ['OK'],
      }).then(alert => alert.present());
    } catch (error) {
      console.error(error);
      alertController.create({
        header: 'Error',
        message: `Failed to print: ${error.message}`,
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  };
  </script>

  
  
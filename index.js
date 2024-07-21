async function connectToBluetooth(uuid) {
    try {
        // Request Bluetooth device
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [uuid] }]
        });

        // Connect to the device
        const server = await device.gatt.connect();
        console.log('Connected:', device.name);

        // Optional: Disconnect after a short delay
        setTimeout(() => {
            device.gatt.disconnect();
            console.log('Disconnected:', device.name);
        }, 10000); // Disconnect after 10 seconds
    } catch (error) {
        console.error('Error:', error);
    }
}

function startBluetoothStressTest() {
    // Get the UUID from the input field
    const uuid = document.getElementById('uuidInput').value;

    // Check if UUID is not empty
    if (!uuid) {
        alert('Please enter a UUID.');
        return;
    }

    // Limit the number of simultaneous connections
    const numberOfConnections = 10;
    
    for (let i = 0; i < numberOfConnections; i++) {
        connectToBluetooth(uuid);
    }
}

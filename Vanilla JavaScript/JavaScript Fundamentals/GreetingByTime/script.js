
function greetBasedOnTime() {
    // get current hour
    const hour = new Date().getHours();

    let greeting = "Good Morning!";     // set greeting to morning by default

    if (hour >= 12 && hour < 18) {
      greeting = "Good Afternoon!";
    } else if (hour >= 18) {
      greeting = "Good Evening!";
    }

    alert(greeting); // Display the greeting in an alert box
};

// call function
greetBasedOnTime();
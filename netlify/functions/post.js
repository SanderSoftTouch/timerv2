exports.handler = async (event, context) => {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    console.log("Post werkt", data);

    // You can add your MongoDB connection and logic here

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Data received successfully", data: data }),
    };
};
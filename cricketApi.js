import fetch from "node-fetch";

const API_KEY = "/"; // Your CricAPI key
const BASE_URL = "https://api.cricapi.com/v1/countries";

// Function to fetch data from a specific offset
async function fetchFromOffset(offset) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&offset=${offset}`);
    const data = await response.json();

    if (data.status !== "success") {
      console.error("Failed to fetch data");
      return [];
    }

    const dataArray = data.data;

    if (!dataArray) {
      return [];
    } else if (offset >= data.info.totalRows) {
      return dataArray;
    } else {
      const nextPageData = await fetchFromOffset(offset + 25);
      return dataArray.concat(nextPageData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Main function to fetch and log all data
async function main() {
  try {
    const allData = await fetchFromOffset(0);
    console.log("Complete data fetched:", allData);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Run the main function
main();

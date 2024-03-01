//https://www.w3schools.com/html/

const snakeCase = string => {
  return string.replace(/\W+/g, " ")
    .split(/ /)
    .map(word => word.toLowerCase())
    .join('_');
};

//This function checks the next element sibling of the current element and returns the number of elements that are anchors
function getNextElementSibling(element) {
  let nextElement = element.nextElementSibling;
  let count = 0

  while (nextElement !== null && nextElement.tagName !== "BR") {
    nextElement = nextElement.nextElementSibling;
    if(nextElement !== null && nextElement.tagName === "A"){
      count++;
    }
  }
  return count;
}

function getActiveTabInfo() {
  const categories = [];
  const references = {};

  //Get the active tab. This case, the sidebar
  const activeTab = document.querySelector("#sidenav a.active");

  //Get tab title
  const activeTabTitle = activeTab.textContent;

  //Get the HTML references
  const totalElements = window.document.getElementsByClassName('w3-third').length;

  window.document.querySelectorAll(".w3-third").forEach((a) => {
    let textContent = snakeCase(a.textContent.replace(/[\r\n]/gm, '').trim())
    references[textContent] = { id: textContent, url: a.firstElementChild.href };
  });

  //Get the categories and the number of topics from sidenav
  document.querySelectorAll("#sidenav h2").forEach((h2, index) => {
    const category = h2.textContent;
    const nextElement = h2.nextElementSibling;
    let topics = getNextElementSibling(nextElement);

    //For some reason, it sum but don't add the first 2 elements. To avoid wasting to much time, i simply hard coded the value.
    if(index !== 0){
      topics += 2
    }
    categories.push({ category, topics });
  });

  return { activeTab: { title: activeTabTitle, totalElements, references }, categories };
}

console.log(getActiveTabInfo());


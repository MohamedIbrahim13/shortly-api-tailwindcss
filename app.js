const burger = document.querySelector("#burger")
const menu = document.querySelector("#menu")
const urlForm = document.querySelector("form")
const linksData = document.querySelector("#links")

burger.addEventListener("click", e => {
  if (menu.classList.contains("hidden")) {
    //burger.classList.add("hidden")
    menu.classList.remove("hidden")
    menu.classList.add("block")
  } else {
    menu.classList.add("hidden")
  }
})

const updateUi = result => {
  const { original_link, full_short_link } = result
  linksData.innerHTML += `
  <div
  class="
    flex
    md:flex-row
    flex-col
    items-center
    md:justify-between
    items-center
    bg-white
    rounded
    my-3
    max-w-screen-[1440px]
    p-4
    md:mx-[100px]
    mx-[30px]
  "
>
  <div>${original_link}</div>

  <div
    class="
      flex
      md:flex-row
      flex-col
      items-center
      md:justify-between
      items-center
    "
  >
    <p class="text-[color:var(--cyan)] md:mr-4 mr-0 short">
      ${full_short_link}
    </p>
    <button
      class="
        text-white
        bg-[color:var(--cyan)]
        hover:opacity-60
        inline-block
        text-sm
        py-1.5
        px-2.5
        rounded
        w-full
        md:w-auto
        copy
      "
    
    >
      Copy
    </button>
  </div>
</div>
  `
  const copyBtns = document.querySelectorAll(".copy")
  const shortLinks = document.querySelectorAll(".short")
  Array.from(copyBtns).forEach((btn, idx) => {
    const linksArr = Array.from(shortLinks)
    btn.addEventListener("click", e => {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(linksArr[idx].textContent)

      btn.textContent = "Copied!"
      btn.style.backgroundColor = "var(--dark-violet)"
      btn.style.color = "white"
      /* Alert the copied text */
      alert("Copied the link: " + linksArr[idx].textContent)
    })
  })
}
urlForm.addEventListener("submit", e => {
  e.preventDefault()
  const url = urlForm.url.value.trim()
  if (url === "") {
    urlForm.firstElementChild.style.border = "1px solid var(--red)"
  }
  fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then(res => res.json())
    .then(({ result }) => updateUi(result))
    .catch(err => console.log(err))
  urlForm.reset()
})

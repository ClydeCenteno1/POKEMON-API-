const input = document.querySelector("input")
const form = document.querySelector("form")
const pokemonContainer = document.querySelector("#pokemonContainer")

const pokemonFacts = async (pokemon) => {
    try {
        document.querySelector("#error").textContent = ""
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        return res.data
    } catch (e) {
        const error = document.querySelector("#error")
        error.textContent = "Enter a valid Pokemon!"
        error.classList.add("text-red-700", "font-semibold")
    }
}

const remove = (e) => {
    e.target.parentElement.remove()
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (input.value !== "") {

        const pokemonInfo = await pokemonFacts(input.value)
        console.log(pokemonInfo)

        const newDiv = document.createElement("div")
        newDiv.classList.add("flex", "flex-col", "items-center", "justify-center")

        const name = document.createElement("h2")
        name.textContent = pokemonInfo.name.toUpperCase()
        name.classList.add("text-4xl")

        const image = document.createElement("img")
        image.classList.add("h-[10rem]")
        image.src = pokemonInfo.sprites.front_default
        image.dataset.action = "remove"

        input.value = ""

        newDiv.append(name, image)
        pokemonContainer.append(newDiv)
    } else {
        input.placeholder = "input a pokemon!"
        setTimeout(() => {
            input.placeholder = "Search for a pokemon!"
        }, 3000)
    }

})

pokemonContainer.addEventListener("click", (e) => {
    const action = e.target.dataset.action

    if (action === "remove") {
        remove(e)
    }
})
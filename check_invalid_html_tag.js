// O programa devera receber uma string contendo tags html abertas e fechadas. 
// Deve-se verificar as tags e seus devidos fechamentos
// Exemplo:     input>> "<div><p><div></p></div><i>"
//              output>> [div, i] 
//
//              input>> "<div>awhaw<p>asgagaw<div>aawg<p>awgawg</div></i>"
//              output>> { unclosed_tag: [ 'p', 'div', 'p' ], not_opened: [ '/i' ] }

function HTMLElement(str){
    

    function findElements(htmlElement){
        let regex_opened_element = /\<[a-z]{1,7}\>/g
        let regex_closed_element = /\<\/[a-z]{1,7}\>/g
        
        let opened_elements = htmlElement.match(regex_opened_element).join().replace(/\<|\>/g, "").split(",")
        let closed_elements = htmlElement.match(regex_closed_element).join().replace(/\<|\>/g, "").split(",")
        return {  opened_elements, closed_elements }
    }

    
    function checkOpenedElement(opened_elements, closed_elements){
        let closed_elements_copy = closed_elements.slice()
        let unclosed_tag = []
        for (let index = 0; index < opened_elements.length; index++){
            let closed_element_index = closed_elements_copy.indexOf(`/${opened_elements[index]}`, 0)
            if (closed_element_index != -1)  { // Verifica se o elemento aberto foi fechado
                closed_elements_copy.splice(closed_element_index, 1)
            } else unclosed_tag.push(opened_elements[index])
        }
        return unclosed_tag
    }
    
    function checkClosedElement(opened_elements, closed_elements){
        let opened_elements_copy = opened_elements.slice()
        let not_opened_tag = []
        for (let index = 0; index < closed_elements.length; index++){
            let opened_element_index = opened_elements_copy.indexOf(closed_elements[index].substring(1, closed_elements[index].length))
            if (opened_element_index != -1){ 
                opened_elements_copy.splice(opened_element_index, 1)
            } else not_opened_tag.push(closed_elements[index])
            
        }
        return not_opened_tag
    }
    
    let {opened_elements, closed_elements} = findElements(str)
    let unclosed_tag =  checkOpenedElement(opened_elements, closed_elements)
    let not_opened_tag = checkClosedElement(opened_elements, closed_elements)
    
    return {unclosed_tag, not_opened_tag}
}

console.log(HTMLElement("<div>awhaw<p>asgagaw<div>aawg<p>awgawg</div></i></p></p></p>"))
console.log(HTMLElement("<div>awhaw<p>asgagaw<div>aawg<p>awgawg</div></i></p></p>"))
console.log(HTMLElement("<div>haw<p>asgagaw<div>aaw<<p>awg<>wg</div><i></i></p><div>"))

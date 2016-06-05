// Access elements of a collection sequentially without
// needing to know the underlying representation.

/************
   Iterator
 ************/
function Iterator(arr) {
  let currentPosition = -1;
  
  return {
     hasNext() {
       return currentPosition+1 < arr.length;
     },
     next() {
        if(!this.hasNext()) {
           return null;
         }
        currentPosition++;
        return arr[currentPosition];
     }
  }
}

// Example Usage
const people = [
    { id: 1, name: 'John' }, 
    { id: 2, name: 'George' }, 
    { id: 3, name: 'Guy' }
];
const peopleIterator = Iterator(people); // Create Iterator for 'people'
while(peopleIterator.hasNext()) {
	let person = peopleIterator.next();
	console.log(person.name + '\'s id is: ' + person.id + '!');
}

// John's id is: 1!
// George's id is: 2!
// Guy's id is: 3!
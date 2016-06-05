// Memento pattern is used to restore state of an object to a previous state. 
function Memento(initialState) {
	let state = initialState || null;
	let stateList = state ? [state] : [];

	return {
		getState() {
			return state;
		},
		getStateList() {
			return stateList;
		},
		get(index) {
			if(index > -1 && index < stateList.length) {
				return stateList[index];
			}
			throw new Error('No state indexed ' + index);
		},
		addState(state) {
			if(!state) {
				throw new Error('Please provide a state object');
			}
			stateList.push(state);
		}
	} 
}

// Helper function used to deep copy an object using jQuery
const copy = (obj) => jQuery.extend(true, {}, obj)

// Example Usage, please notice that using this pattern, you should
// not mutate objects or arrays, but clone them, since they are passed
// by reference in javascript.
// If your state is a string or a number however, you may mutate it.
let songs = {
	Queen: ['I want to break free', 'Another on bites the dust', 'We will rock you'],
	Scorpins: ['Still loving you', 'Love will keep us alive', 'Wind of change'],
	Muse: ['Butterflies and hurricanes', 'Starlight', 'Unintended'],
	BeeGees: ['How deep is your love', 'Staying alive']
}

const memento = Memento(copy(songs)); // Initialize Memento
songs.BeeGees.push('Too much heaven');
songs.Muse.push('Hysteria');
memento.addState(copy(songs)); // Add new state to memento
songs['Abba'] = ['Mama mia', 'Happy new year'];
songs['Eric Clapton'] = ['Tears in heaven', 'Bell bottom blues'];
memento.addState(copy(songs)); // Add new state to memento
console.log(memento.getStateList()); // log state list
console.log(memento.getState()); // log current state
console.log(memento.get(1)); // log second state
songs = memento.get(0); // set songs to initial state
memento.addState(copy(songs)); // Add new old state to memento
console.log(memento.getStateList()); // log state list
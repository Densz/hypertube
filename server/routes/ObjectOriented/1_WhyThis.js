function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER

// => SAME

function identify2(context) {
	return context.name.toUpperCase();
}

function speak2(context) {
	var greeting = "Hello, I'm " + identify2( context );
	console.log( greeting );
}

identify2( you ); // READER
speak2( me ); // Hello, I'm KYLE

// => This to keep track of the state
function foo(num) {
	console.log( "foo: " + num );
	
	// keep track of how many times `foo` is called
	this.count++;
	console.log(this.count)
}
foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo.call(foo, i);
	}
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
// When the code executes foo.count = 0, indeed it's adding a property count to the function object foo. But for the this.count reference inside of the function,
// Count is updated only inside the function
console.log( foo.count ); // 0 -- WTF?

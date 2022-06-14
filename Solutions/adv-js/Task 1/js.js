class Person {
    run() {
      console.log(this.jump());
    }
  
    jump() {
      return 'Bunny';
    }
  }
  
  const bob = new Person();
  
  const alice = {
    jump: () => {
      return 'Wonderland';
    }
  };

  console.log(bob.run.call(alice));




  

this.firstName = "Bob";
this.lastName = "Hello";

const person = {
  firstName: "Alice",
  lastName: "Bye",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}

const member = {
  firstName: "John",
  lastName: "Doe",
}

let lala = person.fullName.bind(this);
let gaga = person.fullName.bind(member)
console.log(person.fullName.call(this));
console.log(lala());
console.log(gaga());

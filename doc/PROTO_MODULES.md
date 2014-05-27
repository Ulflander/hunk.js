# Proto modules

Proto modules are modules that are instanciable using the `new` keyword.

Goal we want to achive is to use a `Animal` and instanciate it twice: 
one for a dog, one for a cat.

```
// Somewhere in our code
var Animal = hunk('Animal');

var dog = new Animal('warf');
dog.speak();
// -> warf

var cat = new Animal('meow');
cat.speak();
// -> meow
```

### The animal module

[Sooooon ;)]
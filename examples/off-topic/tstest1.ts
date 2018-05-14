// // typescript types doubt: https://stackoverflow.com/questions/50322488/array-of-unknown-size-with-items-of-different-classes-that-extends-the-same-pare


// class Base {
//   name: string
// }

// class Sub1 extends Base {
//   prop1: number
// }

// class Sub2 extends Base {
//   prop2:string
// }

// // there will be other Base subclasses - I don't know how much - some provided by third party plugins

// // public function called by end users 
// function f(arr: Base[]){
// }

// f([
//   {name: '1', prop1: 1} as Sub1, 
//   {name: '1', prop2: '2'} as Sub2, 
// ])

// // the only elegant way for users to call f() is by casting each array item. I don't want my library's users to be force to do that. Is non hard and non obvious.
// // In an object oriented language, because of  polymorphism, since Sub1 and Sub2 ARE instances of Base I (and my users) EXPECT NOT HAVING TO CAST HERE. 

// // Is there a way of users calling f() without having to specify "as Sub1", "as Sub2" ? (and without having to define parameter as any[])

// // Note: Because I don't know all Base subclasses (some could be provided by third parties), I cannot define f argument using type union (arr: Array<Sub1|Sub2>)

// // Thanks!
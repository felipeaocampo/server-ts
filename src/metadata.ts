import "reflect-metadata";

// @controller
class Plane {
  color: string = `red`;

  @get(`/login`)
  fly(): void {
    console.log(`vrrrr!`);
  }
}

function get(path: string) {
  return (target: Plane, key: string) => {
    Reflect.defineMetadata(`path`, path, target, key);
  };
}

// function controller(target: typeof Plane) {
//   for (const key in target.prototype) {
//     const path = Reflect.getMetadata(`path`, target.prototype, key);

//     router.get(path, target.prototype[key])
//   }
// }

import "reflect-metadata";
import express, { NextFunction, RequestHandler } from "express";

import AppRouter from "../../AppRouter";
import { Methods } from "./methods";
import { MetadataKeys } from "./MetadataKeys";

function bodyValidators(keys: string): RequestHandler {
  return (req, res, next: NextFunction) => {
    console.log(`did you make it here?`);
    console.log(`BODY: `, req.body);
    if (!req.body) {
      res.status(422).send(`Invalid request! :)`);
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Invalid request! :D`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return (target: Function) => {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}

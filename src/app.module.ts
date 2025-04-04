import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';

// The nestjs framework is built by using classes and decorators
// These classes are referenced by decorators
// @module is a decorator

// Modules in nestJS are used to organize the node server
// The app module is the parent module

// A module in nestJS has the following properties:
// imports, controllers, providers, and exports
// These properties will be explained as we use their functionality

// Now we can reference our TutorialModule as an import
// We have linked the parent AppModule ti the child TutorialModule
// Think of this as sharing a folder in box with somebody else


@Module({
    imports: [StatusModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

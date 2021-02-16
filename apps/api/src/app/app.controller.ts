import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateTodoDTO, DeleteTodoDTO, UpdateTodoDTO } from '@todoapp/dto';

import { AppService } from './app.service';

import { TodoValidationPipe } from '@todoapp/validation';

@Controller('/todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all')
  getAllTodos() {
    return this.appService.getAll();
  }

  @UsePipes(ParseIntPipe)
  @Get('/:id')
  getTodosById(@Param('id') id: number) {
    console.log(`getTodosById invoked with id: ${id}`);
    const data = this.appService.getOne(id);
    return { success: true, data: data ?? {} };
  }

  @Post('/create')
  createTodo(@Body(TodoValidationPipe) createParams: CreateTodoDTO) {
    console.log(
      `createTodo invoked with params: ${JSON.stringify(createParams)}`
    );
    const data = this.appService.createOne(createParams);
    return { success: true, data: data };
  }

  @Post('/update')
  updateTodo(@Body(TodoValidationPipe) updateParams: UpdateTodoDTO) {
    console.log(
      `updateTodo invoked with params: ${JSON.stringify(updateParams)}`
    );
    const data = this.appService.updateOne(updateParams);
    return { success: true, data };
  }

  @Post('/delete')
  deleteTodo(@Body() deleteParams: DeleteTodoDTO) {
    console.log(`deleteTodo invoked with params: ${deleteParams.id}`);
    const data = this.appService.deleteOne(deleteParams.id);
    return { success: true, data };
  }
}

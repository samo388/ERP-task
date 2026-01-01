import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status!: 'pending' | 'in_progress' | 'completed';

  @Prop({ required: true })
  userId!: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

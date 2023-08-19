import { DataSource } from 'typeorm';
import { configService } from './config.service';

const config = configService.getDataSourceOptions();
const dataSource = new DataSource(config);

export default dataSource;

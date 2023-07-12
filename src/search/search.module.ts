import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { SearchQueryBuilderService } from './query-builder.service';
import { SearchServiceController } from './search.controller';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [],
            useFactory: async () => ({
              node: process.env.ELASTIC_URL || 'http://localhost:9200',
              maxRetries: 10,
              requestTimeout: 60000,
              auth: {
                username: process.env.ELASTIC_USERNAME,
                password: process.env.ELASTIC_PASSWORD
              }
            }),
            inject: [],
        }),
    ],
    controllers: [SearchServiceController],
    providers: [SearchService, SearchQueryBuilderService],
    exports: [ElasticsearchModule, SearchService, SearchQueryBuilderService],
})
export class SearchModule implements OnModuleInit {
    constructor(private readonly searchService: SearchService) { }
    public async onModuleInit() {
      await this.searchService.createIndex();
    }
}

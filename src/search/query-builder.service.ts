import { Injectable } from '@nestjs/common';
import { SearchDtoParam } from './search.dto';

@Injectable()
export class SearchQueryBuilderService {
  constructor() { }

  public buildSearchQuery(searchParam: SearchDtoParam) {
    // tslint:disable-next-line:naming-convention
    const { search_term } = searchParam;
    try {

      const query = [];
      let flag = false;
      if (search_term) {
        flag = true;
        query.push({
          multi_match: {
            query: `${search_term}`,
            type: 'cross_fields',
            fields: [
              'name',
              'name.word_delimiter',
              'url',
              'text',
              'description',
              'description.word_delimiter',
            ],
            operator: 'or',
          },
        });
      }
      if (flag) {
        return {
          query: {
            bool: {
              must: query,
            },
          },
        };
      }
      return {};

    } catch (err) {
      
    }
  }
}
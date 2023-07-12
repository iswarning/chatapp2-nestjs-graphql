import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchDtoParam } from "./search.dto";

@Controller('search-service')
export class SearchServiceController {
  private readonly log = new Logger(SearchServiceController.name);

  constructor(private readonly service: SearchService) { }


  @HttpCode(HttpStatus.CREATED)
  @Post(
    '/search',
  )
  //@UseGuards(new JWTAuthGuard())
  async fetchESResults(
    @Body() searchDto: SearchDtoParam,
  ) {
    return this.service.search(searchDto)
  }

//   @HttpCode(HttpStatus.CREATED)
//   @Post(
//     '/sync',
//   )
}
export const Mapping = {
    properties: {
      text: {
        type: 'text',
        analyzer: 'english',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 1024
          },
          word_delimiter: {
            type: 'text',
            analyzer: 'word_delimiter'
          }
        }
      },
      name: {
        type: 'text',
        analyzer: 'english',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256
          }
        }
      },
      id: {
        type: 'keyword'
      },
      description: {
        type: 'text',
        analyzer: 'english',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256
          }
        }
      },
      url: {
        type: 'text',
        analyzer: 'english',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256
          }
        }
      }
    }
  }

  export const Settings = {

  }
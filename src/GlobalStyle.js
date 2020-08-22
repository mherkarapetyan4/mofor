import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    *, *:before, *:after {
      -webkit-box-sizing: inherit;
      -moz-box-sizing: inherit;
      box-sizing: inherit;
      }

    body {
        padding: 0;
        margin: 0;
    }
    
    .actions-tooltip {
      font-family: 'GothamPro', Arial, sans-serif;
      font-size: 12px;
    }
    
    a {
        text-decoration: none;
    }
    
    .mgfoms_scrollbar {
    
        .ScrollbarsCustom-TrackY {
            width: 3px !important;
        }
        
        .ScrollbarsCustom-ThumbY {
            background: rgba(0,0,0,.3) !important;
        }
        
        .ScrollbarsCustom-TrackX {
            height: 3px !important;
        }
        
        .ScrollbarsCustom-ThumbX {
            background: rgba(0,0,0,.3) !important;
        }
        
    }
    
    .help-active {
        position: relative;
        z-index: 999999 !important;
        color: #fff;
    }
    
    .react-tooltip-lite {
      background: #333;
      color: white;
      border-radius: 4px;
      font-family: 'GothamPro', Arial, sans-serif;
      font-size: 12px;
     }
  
    .react-tooltip-lite-arrow {
      border-color: #333;
    }
    
    .ScrollbarsCustom-Content {
      height: 100%;
    }
    
    @media print {
      img {
        display: none;
      }
    }
`;

export default GlobalStyle;

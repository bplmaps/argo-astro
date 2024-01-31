<template>
  <div :class="['explore-by explore-by-outer explore-by-timelines', { 'explore-by-timelines-active': show_pane }]">
    <div class="filter-explore-by relative mb-4">
      <h2 class="font-heading font-semibold text-4xl mb-4">Explore by Timelines</h2>
      <ul class="flex flex-wrap gap-1">
        <li v-for="(era, era_year) in data.timeline_eras" :key="era_year">
          <a @click="scrollTo(era_year)" :class="['pill', 'cursor-pointer', { 'pill-active': show_era == era_year }]">{{ era.era }}</a>
        </li>
      </ul>
    </div>
    <div class="timeline-years" @scroll.passive="timelineScroll()" v-if="ready && !is_mobile">
      <!-- if it's NOT mobile -->
      <div class="years">
        <div class="year" :id="'year-' + year" :key="year" v-for="(index, year) in data.timeline_events" >
          <div class="year-orient" :id="'year-orient-' + year">
            <div class="era" v-if="data.timeline_eras[year]">
              <div class="era-headline">
                {{ data.timeline_eras[year].era }} &nbsp;
                <span class="era-years">{{ data.timeline_eras[year].era_start_year }} - {{ data.timeline_eras[year].era_end_year }}</span>
              </div>
              <img class="era-image" :src="data.timeline_eras[year].background_image" :alt="data.timeline_eras[year].background_image_alt_tag" loading="lazy" />
              <div class="era-text" v-html="data.timeline_eras[year].era_description"></div>
            </div>
          </div>
          <div class="year-text">{{ year }}</div>
          <div class="map-count">
            <template v-if="data.timeline_events[parseInt(year)].length">
              <a @click="openDrawer(data.timeline_events[parseInt(year)])" class="tooltip">
                <div class="top">
                {{ data.timeline_events[parseInt(year)].length }} Map<template v-if="data.timeline_events[parseInt(year).length + 1] != 1">s</template>
                in {{ parseInt(year) }}<i></i>
                </div>
                {{ data.timeline_events[parseInt(year)].length }}
              </a>
            </template>
            <template v-else><span>0</span></template>
          </div>

          <div class="event-group">
            <details class="event" v-for="(event, index) in data.timeline_events[year]" :key="index">
              <summary class="event-name">
                <div class="event-right">
                  <div v-if="event.solr_ids_array" class="map-count">
                    <a @click="openDrawer(event.solr_ids_array)" class="tooltip">
                    <div class="top">
                      {{ event.solr_ids_array.length }} Related Maps<i></i>
                    </div>
                    {{ event.solr_ids_array.length }}
                    </a>
                  </div>
                </div>
                {{ event.name }} {{ event.end_year }}
              </summary>
              <div class="event-notes">
                {{ event.event_date_range }}<br /><br />{{ event.notes }}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-years" @scroll.passive="timelineScroll()" v-if="ready && is_mobile">
      <!-- if it IS mobile -->
      <div class="years" v-for="(index, year) in data.timeline_events" :key="year">
        <div class="year-orient" :id="'year-orient-' + year">
          <div class="era" v-if="data.timeline_eras[year]">
            <div class="era-headline">
            {{ data.timeline_eras[year].era }} &nbsp;
            <span class="era-years"
              >{{ data.timeline_eras[year].era_start_year }} -
              {{ data.timeline_eras[year].era_end_year }}</span
            >
            </div>
            <img class="era-image" :src="data.timeline_eras[year].background_image" :alt="data.timeline_eras[year].background_image_alt_tag" loading="lazy" />
            <div class="era-text" v-html="data.timeline_eras[year].era_description"></div>
          </div>
        </div>
        <div class="year" :id="'year-' + year">
          <div class="year-text" :class="{ 'no-border': data.timeline_eras[parseInt(year) + 1] }">
            {{ year }}
          </div>
          <div class="event-group" v-if="data.timeline_events[year]">
            <details class="event" v-for="(event, index) in data.timeline_events[year]" :key="index">
              <summary class="event-name">
                <div class="event-right">
                  <div v-if="event.solr_ids_array" class="map-count">
                    <a @click="openDrawer(event.solr_ids_array)" class="tooltip">
                    <div class="top">
                      {{ event.solr_ids_array.length }} Related Maps<i></i>
                    </div>
                    {{ event.solr_ids_array.length }}
                    </a>
                  </div>
                </div>
                {{ event.name }} {{ event.end_year }}
              </summary>
              <div class="event-notes">
                {{ event.event_date_range }}<br /><br />{{ event.notes }}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		data: Object
	},
	data() {
		return {
			ready: false,
			is_mobile: false,
			show_pane: null,
			show_facet: null,
			show_era: Object.keys(this.data.timeline_eras)[0],
			// results
			map_filter_results: [],
			// drawer_results_visible: [], //['commonwealth:hx11z473s', 'commonwealth:hx11z475b', 'commonwealth:hq37vv62q', 'commonwealth:hx11z4717'],
			// map_vector_layers: [],
			// windowWidth: window.innerWidth,
			map_html_icon: null,
			// mi_to_m_factor: 1609.34,
			layersByID: {},
			mapPopup: null,
		};
	},
	beforeMount() {
		this.resize();
    this.ready = true; // prevent painting before data is available
	},
	mounted() {
		window.addEventListener("resize", this.resize);
	},
	unmounted() {
		window.removeEventListener("resize", this.resize);
	},
	methods: {
		openDrawer(which_maps) {
      // TODO: Open the drawer
		},
		resize: function () {
			this.is_mobile = window.innerWidth <= 768;
		},
		timelineScroll: function () {
			let first_div_past_scroll_date = "";
      Object.keys(this.data.timeline_eras).forEach((this_year) => {
        var outsideRect = document.querySelector(".timeline-years").getBoundingClientRect(); // reference to scroll target
        if (this.is_mobile) {
          var insideRectEl = document.querySelector("#year-orient-" + this.data.timeline_eras[this_year].era_end_year);
          if (insideRectEl) {
            var insideRect = insideRectEl.getBoundingClientRect(); // reference to scroll target
          }
        } else {
          var insideRectEl = document.querySelector("#year-" + this.data.timeline_eras[this_year].era_end_year);
          if (insideRectEl) {
            var insideRect = insideRectEl.getBoundingClientRect(); // reference to scroll target
          }
        }
        if (outsideRect && insideRect) {
          var scrollLocation = insideRect["top"] - outsideRect["top"] - outsideRect["height"] - 30;
          // console.log('this_year:', this_year, this.data.timeline_eras[this_year].era_end_year, scrollLocation);
          if (scrollLocation > -176 && first_div_past_scroll_date == "")
            first_div_past_scroll_date = this_year;
        }
      });
			this.show_era = first_div_past_scroll_date;
		},
		scrollTo: function (which_div) {
			// update button state
			this.show_era = which_div;
			// find location and move to it
			var outsideElem = document.querySelector(".timeline-years");
			var outsideRect = outsideElem.getBoundingClientRect(); // reference to scroll target
			var insideRect = document
				.querySelector("#year-orient-" + which_div)
				.getBoundingClientRect(); // reference to scroll target
			var scrollLocation =
				Math.abs(
				insideRect["top"] - outsideRect["top"] + outsideElem.scrollTop
				) - 30;
			// console.log('>>>>>', outside['top'], inside['top'], scrollLocation, outsideElem.scrollTop);
			document.querySelector(".timeline-years").scrollTo({
				top: scrollLocation,
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		},
	},
};
</script>

<style scoped>
.timeline-years {
	margin-top: 10px;
	height: 60vh;
	overflow-x: scroll;
	scroll-behavior: smooth;
	background-color: #E3EBEF;
	padding: 30px;
	border-radius: 15px;
}
.timeline-years::-webkit-scrollbar {
	display: none;
}
.timeline-years .years {
	margin-left: calc(35vw + 25px);
}
.timeline-years .years .year {
	display: flex;
	position: relative;
	border-left: 2px solid #4e798d;
	min-height: 35px;
	padding: 5px 0px 5px 14px;
}
.timeline-years .years .year .year-text {
	min-width: 35px;
	font-size: 13px;
	color: #456D7D;
}
.timeline-years .years .year .year-orient {
	position: absolute;
	top: 14px;
	left: -10px;
	width: 19px;
	border-top: 1px solid #979797;
}
.timeline-years .years .year .year-orient .era {
	position: absolute;
	top: -15px;
	right: 33px;
	width: 35vw;
	background: #FFFFFF;
	border: .5px solid #ACACAC;
	border-radius: 15px 7px 15px 15px;
	padding: 10px;
}
.timeline-years .years .year .year-orient .era::before {
	content: '';
	position: absolute;
	top: 8px;
	right: -6px;
	width: 10px;
	height: 10px;
	background: #FFFFFF;
	border-right: .25px solid #96969699;
	border-top: .25px solid #969696ee;
	transform: rotate(45deg);
	z-index: 0;
}
.timeline-years .years .year .year-orient .era .era-headline {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 5px;
}
.timeline-years .years .year .year-orient .era .era-headline .era-years {
	font-size: 14px;
	font-weight: 400;
}
.timeline-years .years .year .year-orient .era .era-text {
	font-weight: 400;
	font-size: 14px;
}
.timeline-years .years .year .year-orient .era .era-text p {
	margin: 5px 0;
}
.timeline-years .years .year .year-orient .era .era-image {
	max-width: 100%;
}
.timeline-years .years .year .map-count > span,
.map-count > a, #selected-location-icon {
	display: flex;
	width: 22px;
	height: 22px;
	border: .25px solid #4E798D;
	font-weight: 500;
	border-radius: 15px;
	font-size: 11px;
	line-height: 17px;
	background-color: white;
	text-align: center;
	/* padding-top: 3px; */
	color: #4E798D;
	justify-content: center;
    align-items: center;
}
.timeline-years .years .year .event-group {
	display: block;
	width: 100%;
	margin-top: -7px;
	margin-left: 10px;
}
.timeline-years .years .year .event {
	width: 100%;
	position: relative;
	margin-bottom: 4px;
	background: #FFFFFF;
	border: .25px solid #979797;
	box-shadow: 0px 1px 2px rgb(150 150 150 / 35%);
	font-size: 14px;
	color: #000000;
	letter-spacing: 0;
	line-height: 13px;
	border-radius: 5px;
}
summary {list-style: none}
summary::-webkit-details-marker {display: none; }
.timeline-years .years .year .event:first-child::before {
	content: '';
	position: absolute;
	top: 11px;
	left: -5px;
	width: 8px;
	height: 8px;
	background: #FFFFFF;
	border-left: .25px solid #979797;
	border-bottom: .25px solid #979797;
	transform: rotate(45deg);
	z-index: 0;
}
.timeline-years .years .year .event .event-name {
	width: 100%;
	padding: 8px 7px 8px 15px;
	font-weight: 400;
	cursor: pointer;
}
.timeline-years .years .year .event .event-notes {
	padding: 12px 15px;
	line-height: 20px;
}
.timeline-years .years .year .event[open] .event-name {
	background-color: black;
	color: white;
}
.timeline-years .years .year .event[open]:first-child::before {
	background: #000;
}
.timeline-years .years .year .event .event-name .event-right {
	display: flex;
	float: right;
	margin-top: -4px;
	margin-right: 32px;
}
.timeline-years .years .year .event .event-name .event-right::after {
	content: '';
	position: absolute;
	display: block;
	width: 12px;
	height: 10px;
	right: 14px;
	top: 11px;
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTlweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTkgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iMTI4MCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMyIgc3Ryb2tlPSIjNjE2MTYxIiBzdHJva2Utd2lkdGg9IjAuNSIgcG9pbnRzPSIxIDAuMjI3ODQwOTg0IDkuNSA5LjIyNzg0MDk4IDE4IDAuMjI3ODQwOTg0Ij48L3BvbHlsaW5lPgogICAgPC9nPgo8L3N2Zz4K);
	background-size: contain;
	background-repeat: no-repeat;
}
.timeline-years .years .year .event[open] .event-name .event-right::after {
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTlweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTkgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iMTI4MCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMyIgc3Ryb2tlPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjUwMDAwMCwgNC43Mjc4NDEpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTkuNTAwMDAwLCAtNC43Mjc4NDEpICIgcG9pbnRzPSIxIDAuMjI3ODQwOTg0IDkuNSA5LjIyNzg0MDk4IDE4IDAuMjI3ODQwOTg0Ij48L3BvbHlsaW5lPgogICAgPC9nPgo8L3N2Zz4K);
}

.tooltip {
  display:inline-block;
  position:relative;
  text-align:left;
	cursor: pointer;
}
.tooltip h3 {margin:12px 0;}
.tooltip .top {
  min-width:120px;
  max-width:200px;
  top:-10px;
  left:50%;
  transform:translate(-50%,-100%);
  padding:5px 10px;
  color:#ffffff;
  background-color:#4e798c;
  font-weight:normal;
  font-size:12px;
  border-radius:4px;
  position:absolute;
  z-index:99999999;
  box-sizing:border-box;
  box-shadow:0 1px 8px rgba(0,0,0,0.5);
  display:none;
}
.tooltip:hover .top {
  display:block;
}
.tooltip .top i {
  position:absolute;
  top:100%;
  left:50%;
  margin-left:-15px;
  width:30px;
  height:15px;
  overflow:hidden;
}
.tooltip .top i::after {
  content:'';
  position:absolute;
  width:15px;
  height:15px;
  left:50%;
  transform:translate(-50%,-50%) rotate(45deg);
  background-color:#4e798c;
  box-shadow:0 1px 8px rgba(0,0,0,0.5);
}
.tooltip em {
	width: 10px;
	height: 10px;
	border: 1px solid #0006;
	color: #0006;
	border-radius: 10px;
	text-align: center;
	font-size: 7px;
	line-height: 10px;
	text-decoration: none;
}

@media only screen and (max-width: 768px) {
	.timeline-years {
		height: 80vh;
		/* margin-right: 12px; */
		padding: 8px;
	}
	.timeline-years .years {
		margin-left: 0;
	}
	.timeline-years .years .year-orient .era {
		width: 100%;
		background-color: #FFFFFF;
		padding: 10px;
		margin: 15px 0;
	}
	.timeline-years .years .year-orient .era .era-headline {
		font-weight: 400;
		margin-bottom: 5px;
	}
	.timeline-years .years .year-orient .era .era-headline .era-years {
		font-weight: 200;
		font-size: 12px;
	}
	.timeline-years .years .year-orient .era .era-text {
		font-weight: 400;
		font-size: 14px;
	}
	.timeline-years .years .year-orient .era .era-text p {
		margin: 5px 0;
	}
	.timeline-years .years .year-orient .era .era-image {
		max-width: 100%;
	}
	.timeline-years .years .year {
		border: unset;
		padding: 0;
	}
	.timeline-years .years .year .year-text {
		position: relative;
		padding-right: 15px;
		min-width: 45px;
		width: 45px;
		border-right: 1px solid #979797;
	}
	.timeline-years .years .year .year-text::after {
		content: '';
		position: absolute;
		top: 0px;
		right: -6.5px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: #8A8A8A;
	}
	.timeline-years .years .year .year-text.no-border, 
	.timeline-years .years:last-of-type .year .year-text {
		border: unset;
	}
	.timeline-years .years .year .event-group {
		/* border-left: 1px solid #979797; */
		padding: 0 0 10px 10px;
		margin-left: 35px;
	}
	.timeline-years .years .year .event {
		box-shadow: unset;
	}
	.timeline-years .years .year .event:first-child::before {
		border-left: 1px solid #96969666;
		border-bottom: 1px solid #96969666;
	}
	.timeline-years .years .year .year-orient .era {
		width: 88vw;
	}
	.timeline-years .years .year .event-name .map-count a {
		box-shadow: none;
		background: #E0E0E0;
		font-weight: 400;
	}
	.timeline-years .years .year > .map-count {
		position: absolute;
		left: 60px;
		top: -2px;
		z-index: 3;
	}
	.timeline-years .years .year .year-orient .era {
		left: 33px;
		border: unset;
		box-shadow: unset;
	}
	.timeline-years .years .year .year-orient .era::before {
		display: none;
	}
	#popup {
		width: 400px;
	}
}
</style>
<template>
  <div class="mb-12 explore-by explore-by-outer explore-by-timelines">
    <div class="filter-explore-by relative mb-4">
      <h2 class="heading-underlined font-heading font-medium text-xl md:text-3xl text-bismark-950 mb-4">
		<span>
			Explore by Timelines
		</span>
	  </h2>
      <ul class="flex flex-wrap gap-1" v-if="data">
        <li v-for="(era, eraYear) in data.timeline_eras" :key="eraYear">
          <a @click="scrollTo(eraYear)" :class="['pill', 'cursor-pointer', { 'pill-active': showEra == eraYear }]">{{ era.era }}</a>
        </li>
      </ul>
    </div>
    <div class="timeline-years shadow-lg" @scroll.passive="timelineScroll()" v-if="ready && !isMobile">
      <!-- if it's NOT mobile -->
      <div class="years">
        <div class="year" :id="'year-' + year" :key="year" v-for="(index, year) in data.timeline_events" >
          <div class="year-orient" :id="'year-orient-' + year">
            <div class="era" v-if="data.timeline_eras[year]">
              <div class="era-headline">
                {{ data.timeline_eras[year].era }} &nbsp;
                <span class="era-years">{{ data.timeline_eras[year].era_start_year }} - {{ data.timeline_eras[year].era_end_year }}</span>
              </div>
              <img class="era-image rounded aspect-[3] object-cover object-center mb-2" :src="data.timeline_eras[year].background_image" :alt="data.timeline_eras[year].background_image_alt_tag" loading="lazy" />
              <div class="era-text leading-tight" v-html="data.timeline_eras[year].era_description"></div>
            </div>
          </div>
          <div class="year-text">{{ year }}</div>

          <div class="event-group">
            <details class="event" v-for="(event, index) in data.timeline_events[year]" :key="index">
              <summary class="event-name">
                <div class="event-right">
                  <div v-if="event.solr_ids_array" class="map-count">
                    <div class="tooltip">
                      <div class="top">
                        {{ event.solr_ids_array.length }} Related Maps<i></i>
                      </div>
                      {{ event.solr_ids_array.length }}
                    </div>
                  </div>
                </div>
                {{ event.name }} {{ event.end_year }}
              </summary>
              <div class="event-notes">
                {{ event.event_date_range }}<br /><br />{{ event.notes }}
                <div v-if="event.solr_ids_array">
                  <br />
                  <button @click="openDrawer(event.solr_ids_array)" class="button dark mt-auto">
                    See {{ event.solr_ids_array.length }} related maps
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-years" @scroll.passive="timelineScroll()" v-if="ready && isMobile">
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

<script setup>
import { isDrawerOpen, drawerIdentifiers } from '../../../drawerStore';
import { useStore } from '@nanostores/vue';

const $isDrawerOpen = useStore(isDrawerOpen);
const $drawerIdentifiers = useStore(drawerIdentifiers);
</script>

<script>
export default {
	props: {
		jsonSrc: String
	},
	data() {
		return {
			ready: false,
			isMobile: false,
		};
	},
	async beforeMount() {
    const response = await fetch(this.jsonSrc);
    this.data = await response.json();
    this.showEra = Object.keys(this.data.timeline_eras)[0],
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
		openDrawer(identifiers) {
      isDrawerOpen.set(true);
      drawerIdentifiers.set(identifiers);
		},
		resize() {
			this.isMobile = window.innerWidth <= 768;
		},
		timelineScroll() {
			let firstDivPastScrollDate = "";
      Object.keys(this.data.timeline_eras).forEach((thisYear) => {
        var outsideRect = document.querySelector(".timeline-years").getBoundingClientRect(); // reference to scroll target
        if (this.isMobile) {
          var insideRectEl = document.querySelector("#year-orient-" + this.data.timeline_eras[thisYear].era_end_year);
          if (insideRectEl) {
            var insideRect = insideRectEl.getBoundingClientRect(); // reference to scroll target
          }
        } else {
          var insideRectEl = document.querySelector("#year-" + this.data.timeline_eras[thisYear].era_end_year);
          if (insideRectEl) {
            var insideRect = insideRectEl.getBoundingClientRect(); // reference to scroll target
          }
        }
        if (outsideRect && insideRect) {
          var scrollLocation = insideRect["top"] - outsideRect["top"] - outsideRect["height"] - 30;
          if (scrollLocation > -176 && firstDivPastScrollDate == "")
            firstDivPastScrollDate = thisYear;
        }
      });
			this.showEra = firstDivPastScrollDate;
		},
		scrollTo(div) {
			// update button state
			this.showEra = div;
			// find location and move to it
			var outsideElem = document.querySelector(".timeline-years");
			var outsideRect = outsideElem.getBoundingClientRect(); // reference to scroll target
			var insideRect = document
				.querySelector("#year-orient-" + div)
				.getBoundingClientRect(); // reference to scroll target
			var scrollLocation =
				Math.abs(
				insideRect["top"] - outsideRect["top"] + outsideElem.scrollTop
				) - 30;
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
	border-radius: 16px;
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
.map-count > .tooltip, #selected-location-icon {
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
	.timeline-years .years .year .event-name .map-count .tooltip {
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
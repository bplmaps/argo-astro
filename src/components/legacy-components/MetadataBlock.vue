<template>
 <table class="meta-information">
					<tr v-for="role, role_key in metadata.name_role_tsim" :key="role_key">
						<th>{{ role }}</th>
						<td>
							<p>{{ metadata.name_tsim[role_key] }}</p>
						</td>
					</tr>
					<tr>
						<th>Date</th>
						<td>
							<p v-for="date in metadata.date_tsim">{{ date }}</p>
						</td>
					</tr>
					<tr v-if="metadata.note_resp_tsim">
						<th>Name on Item</th>
						<td>
							<p>{{ metadata.note_resp_tsim.join("; ") }}</p>
						</td>
					</tr>
					<tr v-if="metadata.publisher_tsi">
						<th>Publisher</th>
						<td>
							<p>{{ metadata.publisher_tsi }}</p>
						</td>
					</tr>
					<tr v-if="metadata.scale_tsim">
						<th>Scale</th>
						<td>
							<p>{{ metadata.scale_tsim[0] }}</p>
						</td>
					</tr>
					<tr v-if="metadata.lang_term_ssim">
						<th>Language</th>
						<td>
							<p>{{ metadata.lang_term_ssim.join("; ") }}</p>
						</td>
					</tr>

					<tr>
						<th>Location</th>
						<td>
							<p>{{ metadata.physical_location_ssim.join("; ") }}</p>
						</td>
					</tr>
					<tr>
						<th>Collection (local)</th>
						<td>
							<p>{{ metadata.related_item_host_ssim.join("; ") }}</p>
						</td>
					</tr>
					<tr>
						<th>Subjects</th>
						<td>
							<ul>
								<li v-for="subject in metadata.subject_topic_tsim">
								{{ subject }}
							</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>Places</th>
						<td>
							<ul>
								<li v-for="place in metadata.subject_geographic_sim">
								{{ place }}
							</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>Extent</th>
						<td>
							<p>{{ metadata.extent_tsi }}</p>
						</td>
					</tr>
					<tr>
						<th>Terms and License</th>
						<td>
								<ul>
									<li>{{ metadata.rights_ss }}</li>
									<li>{{ metadata.license_ss }}</li>
								</ul>
						</td>
					</tr>
					<tr v-if="metadata.note_tsim">
						<th>Notes</th>
						<td>
							<ul>
								<li v-for="note in metadata.note_tsim">
								{{ note }}</li>
							</ul>
						</td>
					</tr>
				</table>
</template>

<script>
export default {
	props: {
		metadata: Object
	}
}
</script>
<template>
  <form role="search" @submit.prevent>
    <div class="flex flex-col gap-1 items-center">
      <input
        v-model="search"
        type="search"
        id="search_location"
        name="search_location"
        placeholder="name / id..."
        autocomplete="off"
        aria-label="search for a location name or id"
        class="px-4 py-2 w-full"
      />

      <span v-if="search !== ''">
        {{ `(${filteredLocations.length} / ${locations.length} locations match the search)` }}
      </span>
      <span v-else>{{ `${locations.length} location${locations.length !== 1 ? 's' : ''} available` }}</span>
    </div>

    <output for="search_location" class="block m-t-10">
      <ul
        v-if="filteredLocations.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-0! gap-2 list-none"
      >
        <li v-for="{ github_id, google_maps_link, name } in filteredLocations" :key="github_id" class="m-t-0!">
          <div class="w-full h-full b-1 b-[rgba(255,255,255,0.1)] p-2">
            <a class="block decoration-none" :href="`/locations/${github_id}`">{{ name }}</a>

            <div class="flex justify-end b-t-1 b-[inherit] p-t-2 m-t-1 gap-2">
              <a
                v-if="$slots.icon_page"
                :href="`/locations/${github_id}`"
                :aria-label="`Page link for location ${name}`"
              >
                <slot name="icon_page" />
              </a>

              <a
                v-if="$slots.icon_maps"
                target="_blank"
                rel="noopener noreferrer"
                :href="google_maps_link"
                :aria-label="`Google Maps link for location ${name}`"
              >
                <slot name="icon_maps" />
              </a>

              <a
                v-if="$slots.icon_github"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://github.com/steve-py96/foosball.fyi/blob/main/src/content/locations/${github_id}`"
                :aria-label="`GitHub source code link for location ${name}`"
              >
                <slot name="icon_github" />
              </a>
            </div>
          </div>
        </li>
      </ul>

      <p v-else>no search results available</p>
    </output>
  </form>
</template>

<script setup lang="ts">
import type { FoosLocation } from '@/types/location';
import { computed, ref } from 'vue';

const props = defineProps<{
  locations: Array<FoosLocation>;
}>();

const search = ref('');
const filteredLocations = computed(() =>
  props.locations.filter(({ name, github_id }) => {
    const lowercasedName = name.toLowerCase();
    const lowercasedId = github_id.toLowerCase();
    const lowercasedSearch = search.value.toLowerCase();

    return lowercasedId.includes(lowercasedSearch) || lowercasedName.includes(lowercasedSearch);
  })
);
</script>

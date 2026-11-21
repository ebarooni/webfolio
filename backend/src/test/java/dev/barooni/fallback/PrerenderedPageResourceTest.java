package dev.barooni.fallback;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class PrerenderedPageResourceTest {

  @ParameterizedTest
  @ValueSource(strings = {"plugins/capacitor-calendar", "plugins/capacitor-calendar/"})
  void routeMapsToItsIndexFile(String path) {
    assertEquals(
        Optional.of("META-INF/resources/plugins/capacitor-calendar/index.html"),
        FallbackResource.prerenderedPageResource(path));
  }

  @ParameterizedTest
  @ValueSource(strings = {"de/blog/from-astro-to-angular", "de/blog/from-astro-to-angular/"})
  void languageRouteMapsToItsIndexFile(String path) {
    assertEquals(
        Optional.of("META-INF/resources/de/blog/from-astro-to-angular/index.html"),
        FallbackResource.prerenderedPageResource(path));
  }

  @ParameterizedTest
  @ValueSource(strings = {"", "/"})
  void homeMapsToTheRootIndexFile(String path) {
    assertEquals(
        Optional.of("META-INF/resources/index.html"),
        FallbackResource.prerenderedPageResource(path));
  }

  @ParameterizedTest
  @ValueSource(strings = {"//", "../secrets", "plugins/../..", "plugins//x", "Blog", "a.html"})
  void unusualPathHasNoPrerenderedPage(String path) {
    assertTrue(FallbackResource.prerenderedPageResource(path).isEmpty());
  }

  @ParameterizedTest
  @ValueSource(strings = {"access-denied", "access-denied/"})
  void clientRouteGetsTheShell(String path) {
    assertTrue(FallbackResource.isClientRoute(path, true));
  }

  @ParameterizedTest
  @ValueSource(strings = {"unknown", "de/unknown", "blog/unknown-post", "nl/projects/x", "a.html"})
  void unknownAddressIsNotAClientRoute(String path) {
    assertFalse(FallbackResource.isClientRoute(path, true));
  }

  @ParameterizedTest
  @ValueSource(strings = {"projects", "de/blog/any-post"})
  void everyRouteIsAClientRouteWithoutPrerenderedPages(String path) {
    assertTrue(FallbackResource.isClientRoute(path, false));
  }

  @ParameterizedTest
  @ValueSource(strings = {"profile.jpeg", "blog/old-post.html"})
  void missingFileIsNeverAClientRoute(String path) {
    assertFalse(FallbackResource.isClientRoute(path, false));
  }
}

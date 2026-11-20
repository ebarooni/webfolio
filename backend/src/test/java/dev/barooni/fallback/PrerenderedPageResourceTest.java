package dev.barooni.fallback;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
  @ValueSource(strings = {"", "/", "../secrets", "plugins/../..", "plugins//x", "Blog", "a.html"})
  void unusualPathHasNoPrerenderedPage(String path) {
    assertTrue(FallbackResource.prerenderedPageResource(path).isEmpty());
  }
}

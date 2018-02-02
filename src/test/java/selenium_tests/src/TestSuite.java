package selenium_tests.src;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
  LoginTest.class,
  TaskDeliveryTest.class
})

public class TestSuite {
}

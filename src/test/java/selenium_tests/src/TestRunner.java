package selenium_tests.src;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class TestRunner {
  public static void main(String[] args) {
    Result result = JUnitCore.runClasses(TestSuite.class);

    for (Failure failure : result.getFailures()) {
      System.out.println(failure.toString());
    }

    if (result.wasSuccessful()) {
      System.out.println("ALL TESTS WERE SUCCESSFULL");
    } else {
      System.err.println("SOME TESTS WERE UNSUCCESSFULL");
    }
  }
}
